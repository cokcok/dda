import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MtdproductdetailPage } from './mtdproductdetail.page';

describe('MtdproductdetailPage', () => {
  let component: MtdproductdetailPage;
  let fixture: ComponentFixture<MtdproductdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtdproductdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MtdproductdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
