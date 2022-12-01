import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { KeyonicService } from './services/keyonic.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public labels = [
    { labelName: 'All', icon: 'finger-print' },
    { labelName: 'Work', icon: 'business' },
    { labelName: 'Uni', icon: 'school' },
    { labelName: 'Shopping', icon: 'bag' },
  ];
  public icons = [
    'beer-outline',
    'chatbubbles-outline',
    'earth-outline',
    'rocket-outline',
    'logo-apple',
    'logo-android',
    'logo-usd',
  ];
  @ViewChild(IonModal)
  modal!: IonModal;

  public displayLabels = this.labels.map((label) => {
    return {
      title: label.labelName,
      url: `/label/${label.labelName}`,
      icon: label.icon,
    };
  });

  protected label: {
    labelName: string;
    icon: string;
  } = {
    labelName: '',
    icon: '',
  };

  constructor(private keyonicService: KeyonicService) {}

  protected onWillDismiss(event: Event) {
    console.log(event);
  }

  protected async cancelLabel() {
    await this.modal.dismiss(null, 'cancel');
    this.label.labelName = '';
  }

  protected async saveLabel() {
    await this.modal.dismiss(this.label, 'confirm');
    this.keyonicService.createLabel(this.label);
    this.labels.push(this.label);
  }

  protected selectIcon(event: Event) {
    this.label.icon = (event as CustomEvent).detail.value;
  }
}
