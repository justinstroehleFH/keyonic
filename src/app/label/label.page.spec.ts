import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { LabelPage } from './label.page';

describe('LabelPage', () => {
  let component: LabelPage;
  let fixture: ComponentFixture<LabelPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelPage],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
