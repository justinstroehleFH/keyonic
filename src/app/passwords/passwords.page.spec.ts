import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { KeyonicService } from '../services/keyonic.service';
import { KeyonicMockService } from '../services/mocks/keyonic-mock.service';

import { PasswordsPage } from './passwords.page';

describe('PasswordsPage', () => {
  let component: PasswordsPage;
  let fixture: ComponentFixture<PasswordsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordsPage],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])],
      providers: [
        {
          provide: KeyonicService,
          useValue: new KeyonicMockService(),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
