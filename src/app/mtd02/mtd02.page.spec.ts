import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Mtd02Page } from './mtd02.page';

describe('Mtd02Page', () => {
  let component: Mtd02Page;
  let fixture: ComponentFixture<Mtd02Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mtd02Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Mtd02Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
