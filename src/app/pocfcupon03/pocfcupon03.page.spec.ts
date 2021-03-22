import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Pocfcupon03Page } from './pocfcupon03.page';

describe('Pocfcupon03Page', () => {
  let component: Pocfcupon03Page;
  let fixture: ComponentFixture<Pocfcupon03Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pocfcupon03Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Pocfcupon03Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
