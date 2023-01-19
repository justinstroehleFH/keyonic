import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Password } from '../libs/types';
import { KeyonicService } from '../services/keyonic.service';
import { ObservonicService } from '../services/observonic.service';

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
    private alertController: AlertController,
    private observonicService: ObservonicService
  ) {}

  ngOnInit() {
    this.label = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.labelName = this.activatedRoute.snapshot.paramMap.get(
      'name'
    ) as string;
    this.loadPasswords();
    this.observonicService.passwordsChanged$.subscribe((data) => {
      if (data) this.loadPasswords();
    });
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
      header: `Are you sure you want to delete the entry "${title}"?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
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
    const { role } = await alert.onDidDismiss();
    if (role === 'cancel') return;
    this.keyonicService.showToast(
      `The entry "${title}" has been deleted!`,
      1500,
      'top'
    );
    this.loadPasswords();
  }
}
