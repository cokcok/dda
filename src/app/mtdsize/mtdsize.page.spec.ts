import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MtdsizePage } from './mtdsize.page';

describe('MtdsizePage', () => {
  let component: MtdsizePage;
  let fixture: ComponentFixture<MtdsizePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtdsizePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MtdsizePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
