import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Po02Page } from './po02.page';

describe('Po02Page', () => {
  let component: Po02Page;
  let fixture: ComponentFixture<Po02Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Po02Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Po02Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
