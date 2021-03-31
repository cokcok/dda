import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Pocfinstall02Page } from './pocfinstall02.page';

describe('Pocfinstall02Page', () => {
  let component: Pocfinstall02Page;
  let fixture: ComponentFixture<Pocfinstall02Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pocfinstall02Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Pocfinstall02Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
