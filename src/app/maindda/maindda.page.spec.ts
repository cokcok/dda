import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainddaPage } from './maindda.page';

describe('MainddaPage', () => {
  let component: MainddaPage;
  let fixture: ComponentFixture<MainddaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainddaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainddaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
