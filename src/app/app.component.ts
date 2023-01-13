import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Label, LabelURL } from './libs/types';
import { KeyonicService } from './services/keyonic.service';
import { ContextLabelComponent } from './components/context-label/context-label.component';
import { ModalLabelComponent } from './components/modal-label/modal-label.component';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  protected labels!: LabelURL[];

  protected label: LabelURL = {
    id: '',
    labelName: '',
    url: '',
    icon: '',
  };

  constructor(
    private keyonicService: KeyonicService,
    private popoverController: PopoverController,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    await this.keyonicService.createStorage();
    this.initLabels();
  }
  private initLabels() {
    const tempLabels: Label[] = this.keyonicService.getLabels();
    this.labels = tempLabels.map((label) => {
      return {
        id: label.id,
        labelName: label.labelName,
        url: `/label/${label.id}/${label.labelName}`,
        icon: label.icon,
      };
    });
  }

  protected onWillDismiss(event: Event) {
    console.log(event);
  }

  protected selectIcon(event: Event) {
    this.label.icon = (event as CustomEvent).detail.value;
  }

  protected async createLabel(event: Event) {
    this.presentModal('', 'create');
  }

  protected async labelContextMenu(event: Event, id: string) {
    event.preventDefault();

    const popover = await this.popoverController.create({
      component: ContextLabelComponent,
      event: event,
    });
    await popover.present();
    const { role } = await popover.onDidDismiss();
    if (role === 'backdrop') return;
    if (role === 'edit') {
      this.presentModal(id, 'edit');
    }
    if (role === 'delete') {
      this.keyonicService.deleteLabel(id);
    }
    this.initLabels();
  }
  private async presentModal(id: string, mode: string) {
    const modal = await this.modalController.create({
      component: ModalLabelComponent,
      componentProps: { id: id, mode: mode },
    });
    modal.present();
    const { role } = await modal.onWillDismiss();
    if (role === 'cancelled') return;
    this.initLabels();
  }
}
