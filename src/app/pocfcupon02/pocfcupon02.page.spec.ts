import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Pocfcupon02Page } from './pocfcupon02.page';

describe('Pocfcupon02Page', () => {
  let component: Pocfcupon02Page;
  let fixture: ComponentFixture<Pocfcupon02Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pocfcupon02Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Pocfcupon02Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
