import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SysgroupmenuPage } from './sysgroupmenu.page';

describe('SysgroupmenuPage', () => {
  let component: SysgroupmenuPage;
  let fixture: ComponentFixture<SysgroupmenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysgroupmenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SysgroupmenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
