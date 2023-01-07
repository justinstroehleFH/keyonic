import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Label, Password } from '../libs/types';
const temp = require('../../assets/temp.json');
// const cryptonic = require('../../../build/Release/cryptonic.node');

@Injectable({
  providedIn: 'root',
})
export class KeyonicService {
  constructor(
    private toastController: ToastController,
    private storage: Storage,
    private file: File
  ) {}

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
  }

  public async createLabel(label: Label) {}

  public openFile(path: string) {
    //TODO
    console.log(path);
  }

  public getPasswords(filter: string) {
    return (temp.passwords as Password[]).filter((e) =>
      filter !== 'All' ? e.label.includes(filter) : true
    );
  }

  public getLabels(): Label[] {
    return temp.labels as Label[];
  }

  public hashPassword() {
    console.log('HASH');
    // console.log(cryptonic);
    // cryptonic.hash(3, 5);
    // console.log(__dirname);
    console.log(process);
  }
}
