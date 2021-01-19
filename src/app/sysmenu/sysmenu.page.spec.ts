import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SysmenuPage } from './sysmenu.page';

describe('SysmenuPage', () => {
  let component: SysmenuPage;
  let fixture: ComponentFixture<SysmenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysmenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SysmenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
