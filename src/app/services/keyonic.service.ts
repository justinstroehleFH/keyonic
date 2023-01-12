import { Injectable, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Label, Password } from '../libs/types';
import cryptonic from 'cryptonic';
import { v4 as uuidv4 } from 'uuid';

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

    this.labels = await this.storage.get('labels');
    if (!this.labels) {
      this.initLabels();
    }

    this.passwords = await this.storage.get('passwords');
    if (!this.passwords) {
      this.initPasswords();
    }
    //TODO broadcaster
  }

  public async createLabel(label: Label) {
    label.id = uuidv4();
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

  public getLabelById(id: string | undefined): Label | undefined {
    return this.labels.find((e) => e.id === id);
  }

  public async saveEntry(password: Password) {
    this.passwords.push(password);
    await this.storage.set('passwords', this.passwords);
  }

  public async deleteEntry(id: string) {
    const index = this.passwords.findIndex((e) => e.id === id);
    this.passwords.splice(index, 1);
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

    await this.storage.set('passwords', this.passwords);
  }

  public editLabel(label: Label) {
    console.log('EDIT', label);
  }

  public async deleteLabel(id: string) {
    const index = this.labels.findIndex((e) => e.id === id);
    this.labels.splice(index, 1);
    await this.storage.set('labels', this.labels);
  }

  //Dummy data when empty
  private async initLabels() {
    const labels = [
      {
        id: '1',
        labelName: 'Shopping',
        icon: 'cart',
      },
      {
        id: '2',
        labelName: 'Work',
        icon: 'business',
      },
      {
        id: '3',
        labelName: 'Uni',
        icon: 'school',
      },
    ];
    this.labels = labels;
    await this.storage.set('labels', labels);
  }

  private async initPasswords() {
    const passwords = [
      {
        id: '1',
        title: 'FHV',
        username: 'nto69',
        password: cryptonic.encrypt('1234'),
        url: 'www.ilias/fhv.at',
        label: ['3'],
      },
      {
        id: '2',
        title: 'ZARA',
        username: 'Shopper3000',
        password: cryptonic.encrypt('WasLacostedDieWelt'),
        url: 'www.zara.at',
        label: ['1'],
      },
      {
        id: '3',
        title: 'GIT',
        username: 'gitlover420',
        password: cryptonic.encrypt('mainBranchAlways'),
        url: 'www.github.com',
        label: ['2', '1'],
      },
      {
        id: '4',
        title: 'ProTask',
        username: 'PT_JST',
        password: cryptonic.encrypt('SAP4LIFE'),
        url: 'www.protask.eu',
        label: ['2'],
      },
    ];
    this.passwords = passwords;
    await this.storage.set('passwords', passwords);
  }
}
