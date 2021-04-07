import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Potf01Page } from './potf01.page';

describe('Potf01Page', () => {
  let component: Potf01Page;
  let fixture: ComponentFixture<Potf01Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Potf01Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Potf01Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
