import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DirectPage } from './direct.page';

describe('DirectPage', () => {
  let component: DirectPage;
  let fixture: ComponentFixture<DirectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DirectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
