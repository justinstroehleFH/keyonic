import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Label } from 'src/app/libs/types';
import { KeyonicService } from 'src/app/services/keyonic.service';

@Component({
  selector: 'app-modal-label',
  templateUrl: './modal-label.component.html',
  styleUrls: ['./modal-label.component.scss'],
})
export class ModalLabelComponent implements OnInit {
  @Input() id?: string;
  @Input() mode?: string;
  public icons = ['beer', 'chatbubbles', 'earth', 'rocket', 'cart'];

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
  }

  protected saveLabel() {
    //TODO validator und schöner machen
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
}
