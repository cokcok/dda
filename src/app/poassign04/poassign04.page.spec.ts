import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Poassign04Page } from './poassign04.page';

describe('Poassign04Page', () => {
  let component: Poassign04Page;
  let fixture: ComponentFixture<Poassign04Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Poassign04Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Poassign04Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
