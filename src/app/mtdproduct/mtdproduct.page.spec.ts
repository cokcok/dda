import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MtdproductPage } from './mtdproduct.page';

describe('MtdproductPage', () => {
  let component: MtdproductPage;
  let fixture: ComponentFixture<MtdproductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtdproductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MtdproductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
