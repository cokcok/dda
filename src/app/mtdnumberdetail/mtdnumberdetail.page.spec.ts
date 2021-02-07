import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MtdnumberdetailPage } from './mtdnumberdetail.page';

describe('MtdnumberdetailPage', () => {
  let component: MtdnumberdetailPage;
  let fixture: ComponentFixture<MtdnumberdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtdnumberdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MtdnumberdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
