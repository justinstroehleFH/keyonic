import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Label, LabelURL } from './libs/types';
import { KeyonicService } from './services/keyonic.service';
import { ContextLabelComponent } from './components/context-label/context-label.component';
import { ModalLabelComponent } from './components/modal-label/modal-label.component';
import { ObservonicService } from './services/observonic.service';
import { OperatingSystem } from '@capacitor/device/dist/esm/definitions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  protected labels!: LabelURL[];

  protected osIcon: string = '';

  protected label: LabelURL = {
    id: '',
    labelName: '',
    url: '',
    icon: '',
  };

  constructor(
    private keyonicService: KeyonicService,
    private popoverController: PopoverController,
    private modalController: ModalController,
    private observonicService: ObservonicService
  ) {}

  async ngOnInit() {
    await this.keyonicService.createStorage();
    this.initLabels();
    this.observonicService.passwordsChanged$.subscribe((data) => {
      if (data) this.initLabels();
    });
    const os = await this.keyonicService.getOperatingSystem();
    this.getOSIcon(os);
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

  private getOSIcon(os: OperatingSystem) {
    switch (os) {
      case 'windows':
        this.osIcon = 'logo-windows';
        break;
      case 'mac' || 'ios':
        this.osIcon = 'logo-apple';
        break;
      case 'android':
        this.osIcon = 'logo-android';
        break;
      default:
        this.osIcon = 'logo-ionic';
        break;
    }
  }
}
