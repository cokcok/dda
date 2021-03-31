import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Pocfgreen01Page } from './pocfgreen01.page';

describe('Pocfgreen01Page', () => {
  let component: Pocfgreen01Page;
  let fixture: ComponentFixture<Pocfgreen01Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pocfgreen01Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Pocfgreen01Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
