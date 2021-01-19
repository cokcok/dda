import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SyssubmenuPage } from './syssubmenu.page';

describe('SyssubmenuPage', () => {
  let component: SyssubmenuPage;
  let fixture: ComponentFixture<SyssubmenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyssubmenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SyssubmenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
