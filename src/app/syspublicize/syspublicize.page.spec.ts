import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SyspublicizePage } from './syspublicize.page';

describe('SyspublicizePage', () => {
  let component: SyspublicizePage;
  let fixture: ComponentFixture<SyspublicizePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyspublicizePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SyspublicizePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
