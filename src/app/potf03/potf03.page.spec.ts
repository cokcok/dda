import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Potf03Page } from './potf03.page';

describe('Potf03Page', () => {
  let component: Potf03Page;
  let fixture: ComponentFixture<Potf03Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Potf03Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Potf03Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
