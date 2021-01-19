import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Mtd01Page } from './mtd01.page';

describe('Mtd01Page', () => {
  let component: Mtd01Page;
  let fixture: ComponentFixture<Mtd01Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mtd01Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Mtd01Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
