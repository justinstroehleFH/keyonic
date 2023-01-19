import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { it } from 'node:test';
import { Observable, of } from 'rxjs';
import { passwords } from '../libs/globals';
import { Label, Password } from '../libs/types';
import { KeyonicService } from '../services/keyonic.service';
import { KeyonicMockService } from '../services/mocks/keyonic-mock.service';

import { DetailsPage } from './details.page';

describe('DetailsPage', () => {
  let component: DetailsPage;
  let fixture: ComponentFixture<DetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: KeyonicService,
          useValue: new KeyonicMockService(),
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                hash: 'test',
              }),
            },
          },
        },
        {
          provide: FormBuilder,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    expect(component.ngOnInit()).toBeTruthy();
  });

  it('should do', () => {
    expect(DetailsPage.matchPassword()).toBeTruthy();
  });
});
