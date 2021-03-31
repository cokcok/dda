import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Pocfgreen02Page } from './pocfgreen02.page';

describe('Pocfgreen02Page', () => {
  let component: Pocfgreen02Page;
  let fixture: ComponentFixture<Pocfgreen02Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pocfgreen02Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Pocfgreen02Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
