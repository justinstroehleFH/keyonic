import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Label } from 'src/app/libs/types';
import { KeyonicService } from 'src/app/services/keyonic.service';
import { icons } from 'src/app/libs/globals';

@Component({
  selector: 'app-modal-label',
  templateUrl: './modal-label.component.html',
  styleUrls: ['./modal-label.component.scss'],
})
export class ModalLabelComponent implements OnInit {
  @Input() id?: string;
  @Input() mode?: string;
  public icons = icons;

  protected label: Label = {
    id: '',
    labelName: '',
    icon: '',
  };

  constructor(
    private keyonicService: KeyonicService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    let label = this.keyonicService.getLabelById(this.id);
    if (label) {
      this.label = label;
    }
  }

  protected cancelLabel() {
    this.modalController.dismiss(null, 'cancelled');
    this.label.labelName = '';
    this.label.icon = '';
  }

  protected saveLabel() {
    if (!this.validate()) return;
    if (this.mode === 'edit') {
      this.keyonicService.editLabel(this.label);
    } else if (this.mode === 'create') {
      this.keyonicService.createLabel(this.label);
    }
    this.modalController.dismiss(null, 'saved');
  }

  protected selectIcon(event: Event) {
    this.label.icon = (event as CustomEvent).detail.value;
  }

  private validate(): boolean {
    return this.label.labelName !== null && this.label.icon !== null;
  }
}
