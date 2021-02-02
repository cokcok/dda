import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MtdsupplierPage } from './mtdsupplier.page';

describe('MtdsupplierPage', () => {
  let component: MtdsupplierPage;
  let fixture: ComponentFixture<MtdsupplierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtdsupplierPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MtdsupplierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
