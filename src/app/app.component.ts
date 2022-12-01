import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { KeyonicService } from './services/keyonic.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  protected labels!: [{ labelName: string; icon: string }];
  public icons = ['beer', 'chatbubbles', 'earth', 'rocket']; //TODO from file
  @ViewChild(IonModal)
  modal!: IonModal;

  // protected displayLabels!: [{ labelName: string; url: string; icon: string }];
  protected displayLabels: any;

  protected label: {
    labelName: string;
    icon: string;
  } = {
    labelName: '',
    icon: '',
  };

  constructor(private keyonicService: KeyonicService) {}

  async ngOnInit() {
    await this.keyonicService.createStorage();
    this.labels = await this.keyonicService.getLabels();
    this.displayLabels = this.labels.map((label) => {
      return {
        title: label.labelName,
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
    this.labels.push(this.label);
  }

  protected selectIcon(event: Event) {
    this.label.icon = (event as CustomEvent).detail.value;
  }
}
