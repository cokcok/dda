import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Pocfinstall01Page } from './pocfinstall01.page';

describe('Pocfinstall01Page', () => {
  let component: Pocfinstall01Page;
  let fixture: ComponentFixture<Pocfinstall01Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pocfinstall01Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Pocfinstall01Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
