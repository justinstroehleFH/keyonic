import { Injectable, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Label, Password } from '../libs/types';
const temp = require('../../assets/temp.json');
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

  public init() {
    this.passwords = temp.passwords as Password[];
    this.labels = temp.labels as Label[];
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
        id: '31',
        title: 'FHV',
        username: 'nto69',
        password: '1234',
        url: 'www.ilias/fhv.at',
        label: ['Uni'],
      },
      {
        id: '2',
        title: 'ZARA',
        username: 'Shopper3000',
        password: 'z12z',
        url: 'www.zara.at',
        label: ['Shopping'],
      },
      {
        id: '3',
        title: 'GIT',
        username: 'gitlover420',
        password: 'git4ever',
        url: 'www.github.com',
        label: ['Work', 'Uni'],
      },
      {
        id: '4',
        title: 'ProTask',
        username: 'PT_JST',
        password: 'proNeverGonnaDie',
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
    console.log(this.labels);
    this.storage.set('labels', this.labels).then(() => {
      this.storage.get('labels').then((l) => (this.labels = l));
    });
  }

  public getPasswordsByLabel(filter: string): Password[] {
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
    this.passwords.push(password);
    this.storage.set('passwords', password).then(() => {
      this.storage.get('password').then((p) => (this.passwords = p));
    });
  }

  public hashPassword() {
    console.log(cryptonic.encrypt('password'));
    console.log(cryptonic.decrypt('cGFzc3dvcmQ='));
  }
}
