import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MtdareaPage } from './mtdarea.page';

describe('MtdareaPage', () => {
  let component: MtdareaPage;
  let fixture: ComponentFixture<MtdareaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtdareaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MtdareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
