import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { ModalController, PopoverController } from '@ionic/angular';

import { AppComponent } from './app.component';
import { KeyonicService } from './services/keyonic.service';
import { KeyonicMockService } from './services/mocks/keyonic-mock.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: KeyonicService,
          useValue: new KeyonicMockService(),
        },
        {
          provide: PopoverController,
          useValue: PopoverController,
        },
        {
          provide: ModalController,
          useValue: ModalController,
        },
      ],
    }).compileComponents();
  });

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have menu labels', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-label');
    expect(menuItems[0].textContent).toContain('KEYONIC');
  });

  it('should have urls', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-item');
    expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual(
      '/label/All/All'
    );
  });
});
