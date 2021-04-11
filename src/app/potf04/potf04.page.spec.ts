import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Potf04Page } from './potf04.page';

describe('Potf04Page', () => {
  let component: Potf04Page;
  let fixture: ComponentFixture<Potf04Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Potf04Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Potf04Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
