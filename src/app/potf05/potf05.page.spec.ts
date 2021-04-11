import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Potf05Page } from './potf05.page';

describe('Potf05Page', () => {
  let component: Potf05Page;
  let fixture: ComponentFixture<Potf05Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Potf05Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Potf05Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
