import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactformPage } from './contactform.page';

describe('ContactformPage', () => {
  let component: ContactformPage;
  let fixture: ComponentFixture<ContactformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactformPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
