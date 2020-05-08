import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewServicePage } from './view-service.page';

describe('ViewServicePage', () => {
  let component: ViewServicePage;
  let fixture: ComponentFixture<ViewServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
