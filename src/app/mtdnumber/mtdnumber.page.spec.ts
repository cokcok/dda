import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MtdnumberPage } from './mtdnumber.page';

describe('MtdnumberPage', () => {
  let component: MtdnumberPage;
  let fixture: ComponentFixture<MtdnumberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtdnumberPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MtdnumberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
