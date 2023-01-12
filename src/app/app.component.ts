import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, PopoverController, ModalController } from '@ionic/angular';
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
  public icons = ['beer', 'chatbubbles', 'earth', 'rocket', 'cart'];
  @ViewChild(IonModal)
  modal!: IonModal;

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

  protected async cancelLabel() {
    await this.modal.dismiss(null, 'cancel');
    this.label.labelName = '';
  }

  protected async saveLabel() {
    await this.keyonicService.createLabel(this.label);
    this.initLabels();
    await this.modal.dismiss(this.label, 'confirm');
  }

  protected selectIcon(event: Event) {
    this.label.icon = (event as CustomEvent).detail.value;
  }

  protected async labelContextMenu(event: Event, id: string) {
    event.preventDefault();

    const popover = await this.popoverController.create({
      component: ContextLabelComponent,
      event: event,
    });
    await popover.present();
    const { role } = await popover.onDidDismiss();
    if (role === 'edit') {
      const modal = await this.modalController.create({
        component: ModalLabelComponent,
        componentProps: { id: id, mode: 'edit' },
      });
      modal.present();
      const role = await modal.onWillDismiss();
      console.log('MODAL', role);
    }
    if (role === 'delete') {
      this.keyonicService.deleteLabel(id);
    }
  }
}
