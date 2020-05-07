import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyServicePage } from './my-service.page';

describe('MyServicePage', () => {
  let component: MyServicePage;
  let fixture: ComponentFixture<MyServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
