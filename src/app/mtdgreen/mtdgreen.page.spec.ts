import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MtdgreenPage } from './mtdgreen.page';

describe('MtdgreenPage', () => {
  let component: MtdgreenPage;
  let fixture: ComponentFixture<MtdgreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtdgreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MtdgreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
