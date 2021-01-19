import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SysgroupPage } from './sysgroup.page';

describe('SysgroupPage', () => {
  let component: SysgroupPage;
  let fixture: ComponentFixture<SysgroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysgroupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SysgroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
