import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Pocfcupon01Page } from './pocfcupon01.page';

describe('Pocfcupon01Page', () => {
  let component: Pocfcupon01Page;
  let fixture: ComponentFixture<Pocfcupon01Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pocfcupon01Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Pocfcupon01Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
