import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Poassign03Page } from './poassign03.page';

describe('Poassign03Page', () => {
  let component: Poassign03Page;
  let fixture: ComponentFixture<Poassign03Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Poassign03Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Poassign03Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
