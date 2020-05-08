import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { LoginService } from '../services/login.service';
import { host as apiHost } from '../services/login.interface';

/** 拦截器 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = '';
    const authInfo = this.loginService.authInfo;

    if (authInfo) {
      token = authInfo.token;
    }

    let ok: string;
    const url = `${apiHost}${req.url}`;

    // 复制一个请求，并给请求头注入令牌
    const authReq = req.clone({
      url,
      headers: req.headers.set('Authorization', token),
    });

    // 用复制的请求头发送请求到下一个拦截器
    return next.handle(authReq).pipe(
      tap(
        event => {
          ok = event instanceof HttpResponse ? 'succeeded' : '';
        },
        error => ok = 'failed',
      ),
      finalize(() => {
        const msg = `${req.method} 请求, 接口: ${req.urlWithParams}: "${ok}".`;
        console.log(msg);
      })
    );
  }
}