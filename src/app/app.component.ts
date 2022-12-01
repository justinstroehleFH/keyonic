import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Label, LabelURL } from './libs/types';
import { KeyonicService } from './services/keyonic.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public icons = ['beer', 'chatbubbles', 'earth', 'rocket']; //TODO from file
  @ViewChild(IonModal)
  modal!: IonModal;

  // protected displayLabels!: [{ labelName: string; url: string; icon: string }];
  protected labels!: LabelURL[];

  protected label: LabelURL = {
    labelName: '',
    url: '',
    icon: '',
  };

  constructor(private keyonicService: KeyonicService) {}

  async ngOnInit() {
    await this.keyonicService.createStorage();
    let tempLabels: Label[] = await this.keyonicService.getLabels();
    this.labels = tempLabels.map((label) => {
      return {
        labelName: label.labelName,
        url: `/label/${label.labelName}`,
        icon: label.icon,
      };
    });
  }

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
    this.label.url = `/label/${this.label.labelName}`;
    this.labels.push(this.label);
  }

  protected selectIcon(event: Event) {
    this.label.icon = (event as CustomEvent).detail.value;
  }
}
