import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Potf02Page } from './potf02.page';

describe('Potf02Page', () => {
  let component: Potf02Page;
  let fixture: ComponentFixture<Potf02Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Potf02Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Potf02Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
