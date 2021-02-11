import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Po01numberPage } from './po01number.page';

describe('Po01numberPage', () => {
  let component: Po01numberPage;
  let fixture: ComponentFixture<Po01numberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Po01numberPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Po01numberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
