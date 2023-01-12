import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Password } from '../libs/types';
import { KeyonicService } from '../services/keyonic.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.page.html',
  styleUrls: ['./label.page.scss'],
})
export class LabelPage implements OnInit {
  protected label!: string;
  protected labelName!: string;
  protected selected!: any;
  protected selectedIndex!: number;

  protected passwords!: Password[];
  protected displayedPasswords!: Password[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private keyonicService: KeyonicService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.label = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.labelName = this.activatedRoute.snapshot.paramMap.get(
      'name'
    ) as string;
    //TODO ng wird nur bei update getriggert aber nicht bei einem neuen entry --> liste nicht aktualisiert
    this.loadPasswords();
  }

  private loadPasswords() {
    this.passwords = this.keyonicService.getPasswordsByLabel(this.label);
    this.displayedPasswords = this.passwords;
  }

  protected select(entry: any, index: number) {
    this.selected = entry;
    this.selectedIndex = index;
  }

  protected async contextClick(event: Event) {
    event.preventDefault();
  }

  protected async copyUsername() {
    navigator.clipboard.writeText(this.selected.username);
    this.keyonicService.showToast('Username copied!', 1500, 'top');
  }

  protected async copyPassword() {
    navigator.clipboard.writeText(
      this.keyonicService.decryptPassword(this.selected.password)
    );
    this.keyonicService.showToast('Password copied!', 1500, 'top');
  }

  protected openURL() {
    window.open(this.selected.url);
  }

  protected deleteEntry() {
    this.presentDeleteAlert(this.selected.id, this.selected.title);
  }

  protected searchEntry(event: Event) {
    const query = (event as CustomEvent).detail.value.toLowerCase();
    this.displayedPasswords = this.passwords.filter(
      (e) =>
        (this.label !== 'All' ? e.label.includes(this.label) : true) &&
        e.title.toLowerCase().indexOf(query) > -1
    );
  }

  async presentDeleteAlert(id: string, title: string) {
    const alert = await this.alertController.create({
      header: `Would you like to delete the entry ${title}`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            //TODO
          },
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.keyonicService.deleteEntry(id);
          },
        },
      ],
    });
    await alert.present();
    await alert.onDidDismiss();
  }
}
