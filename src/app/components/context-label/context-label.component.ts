import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-context-label',
  templateUrl: './context-label.component.html',
  styleUrls: ['./context-label.component.scss'],
})
export class ContextLabelComponent implements OnInit {
  constructor(private popoverController: PopoverController) {}

  ngOnInit() {}

  protected dismiss(role: string) {
    this.popoverController.dismiss(null, role);
  }
}
