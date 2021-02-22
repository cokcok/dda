import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MtdmemberPage } from './mtdmember.page';

describe('MtdmemberPage', () => {
  let component: MtdmemberPage;
  let fixture: ComponentFixture<MtdmemberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtdmemberPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MtdmemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
