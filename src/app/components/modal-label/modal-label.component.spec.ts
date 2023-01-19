import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { KeyonicService } from 'src/app/services/keyonic.service';
import { KeyonicMockService } from 'src/app/services/mocks/keyonic-mock.service';

import { ModalLabelComponent } from './modal-label.component';

describe('ModalLabelComponent', () => {
  let component: ModalLabelComponent;
  let fixture: ComponentFixture<ModalLabelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalLabelComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: KeyonicService,
          useValue: new KeyonicMockService(),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
