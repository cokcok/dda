import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Po01Page } from './po01.page';

describe('Po01Page', () => {
  let component: Po01Page;
  let fixture: ComponentFixture<Po01Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Po01Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Po01Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
