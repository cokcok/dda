import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Poassign02Page } from './poassign02.page';

describe('Poassign02Page', () => {
  let component: Poassign02Page;
  let fixture: ComponentFixture<Poassign02Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Poassign02Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Poassign02Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
