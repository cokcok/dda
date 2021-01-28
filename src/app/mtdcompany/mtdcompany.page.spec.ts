import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MtdcompanyPage } from './mtdcompany.page';

describe('MtdcompanyPage', () => {
  let component: MtdcompanyPage;
  let fixture: ComponentFixture<MtdcompanyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtdcompanyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MtdcompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
