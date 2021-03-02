import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Poassign01Page } from './poassign01.page';

describe('Poassign01Page', () => {
  let component: Poassign01Page;
  let fixture: ComponentFixture<Poassign01Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Poassign01Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Poassign01Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
