import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Poassign05Page } from './poassign05.page';

describe('Poassign05Page', () => {
  let component: Poassign05Page;
  let fixture: ComponentFixture<Poassign05Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Poassign05Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Poassign05Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
