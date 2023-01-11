import { Injectable, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Label, Password } from '../libs/types';
import cryptonic from 'cryptonic';

@Injectable({
  providedIn: 'root',
})
export class KeyonicService implements OnInit {
  private passwords: Password[] = [];
  private labels: Label[] = [];
  constructor(
    private toastController: ToastController,
    private storage: Storage
  ) {}

  ngOnInit(): void {
    this.createStorage();
  }

  public generatePassword() {
    const base =
      '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let password = '';
    for (let index = 0; index < 20; index++) {
      const randomChar = base.charAt(this.getRandomInt(base.length));
      password = password.concat(randomChar);
    }
    return password;
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  public async showToast(
    message: string,
    duration: number,
    position: 'top' | 'bottom' | 'middle' | undefined
  ) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
    });

    await toast.present();
  }

  public async createStorage() {
    await this.storage.create();
    const labels = [
      {
        labelName: 'All',
        icon: 'finger-print',
      },
      {
        labelName: 'Shopping',
        icon: 'cart',
      },
      {
        labelName: 'Work',
        icon: 'business',
      },
      {
        labelName: 'Uni',
        icon: 'school',
      },
    ];
    const passwords = [
      {
        id: '1',
        title: 'FHV',
        username: 'nto69',
        password: 'MTIzNA==',
        url: 'www.ilias/fhv.at',
        label: ['Uni'],
      },
      {
        id: '2',
        title: 'ZARA',
        username: 'Shopper3000',
        password: 'ejEyeg==',
        url: 'www.zara.at',
        label: ['Shopping'],
      },
      {
        id: '3',
        title: 'GIT',
        username: 'gitlover420',
        password: 'Z2l0NGV2ZXI=',
        url: 'www.github.com',
        label: ['Work', 'Uni'],
      },
      {
        id: '4',
        title: 'ProTask',
        username: 'PT_JST',
        password: 'cHJvTmV2ZXJHb25uYURpZQ==',
        url: 'www.protask.eu',
        label: ['Work'],
      },
    ];
    this.labels = labels;
    this.passwords = passwords;
    this.storage.set('labels', labels);
    this.storage.set('passwords', passwords);
  }

  public async createLabel(label: Label) {
    this.labels.push(label);
    this.storage.set('labels', this.labels).then(() => {
      this.storage.get('labels').then((l) => (this.labels = l));
    });
  }

  getPasswordsByLabel(filter: string): Password[] {
    return this.passwords.filter((e) =>
      filter !== 'All' ? e.label.includes(filter) : true
    );
  }

  public getPasswordsById(id: string): Password | undefined {
    return this.passwords.find((e) => e.id === id);
  }

  public getLabels(): Label[] {
    return this.labels;
  }

  async saveEntry(password: Password) {
    console.log(password);
    this.passwords.push(password);
    await this.storage.set('passwords', this.passwords);
  }

  public encryptPassword(password: string): string {
    return cryptonic.encrypt(password);
  }

  public decryptPassword(hash: string): string {
    return cryptonic.decrypt(hash);
  }

  async updateEntry(password: Password) {
    const index = this.passwords.findIndex((e) => e.id === password.id);
    this.passwords[index].label = password.label;
    this.passwords[index].password = password.password;
    this.passwords[index].title = password.title;
    this.passwords[index].url = password.url;
    this.passwords[index].username = password.username;

    const test = await this.storage.set('passwords', this.passwords);
  }
}
