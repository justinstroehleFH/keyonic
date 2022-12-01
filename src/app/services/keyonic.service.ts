import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class KeyonicService {
  constructor(
    private toastController: ToastController,
    private storage: Storage
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

  public async createLabel(label: { labelName: string; icon: string }) {
    let currentLabels = await this.storage.get('labels');
    let labels = JSON.parse(currentLabels);
    if (!labels) {
      labels = [];
    }
    labels.push(label);
    this.storage.set('labels', JSON.stringify(labels));
  }

  public async getLabels() {
    let currentLabels = await this.storage.get('labels');
    let labels = JSON.parse(currentLabels);
    if (!labels) {
      labels = [];
      let label = { labelName: 'All', icon: 'finger-print' };
      labels.push(label);
      this.createLabel(label);
    }
    return labels;
  }
}
