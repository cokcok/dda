import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MtdshippingPage } from './mtdshipping.page';

describe('MtdshippingPage', () => {
  let component: MtdshippingPage;
  let fixture: ComponentFixture<MtdshippingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtdshippingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MtdshippingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
