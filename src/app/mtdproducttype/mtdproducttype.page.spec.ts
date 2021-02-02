import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MtdproducttypePage } from './mtdproducttype.page';

describe('MtdproducttypePage', () => {
  let component: MtdproducttypePage;
  let fixture: ComponentFixture<MtdproducttypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtdproducttypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MtdproducttypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
