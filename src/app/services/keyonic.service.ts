import { Injectable, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Label, Password } from '../libs/types';
import { FormGroup } from '@angular/forms';
const temp = require('../../assets/temp.json');

@Injectable({
  providedIn: 'root',
})
export class KeyonicService {

  private passwords: Password[]= [];
  constructor(
    private toastController: ToastController,
    private storage: Storage,
    private file: File
  ) {}


  public init(){
    this.passwords = temp.passwords as Password[];
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
  }

  public async createLabel(label: Label) {}

  public openFile(path: string) {
    //TODO
    console.log(path);
  }

  public getPasswordsByLabel(filter: string):Password[]  {
    return this.passwords.filter((e) =>
      filter !== 'All' ? e.label.includes(filter) : true
    );
  }

  public getPasswordsById(id: string): Password | undefined {
    return this.passwords.find((e) => e.id === id)

  }

  public getLabels(): Label[] {
    return temp.labels as Label[];
  }

  async saveEntry(password: Password) {
    // TODO Save

    this.passwords.push(password);
    // const filename = localStorage.getItem("filename");
   /*  this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err =>
      console.log('Directory doesnt exist'));

      const filename = 'passwords';
      const path ='./';
    if(filename){
      console.log(this.file)
      await this.file.writeFile(this.file.dataDirectory, filename, JSON.stringify(password), {replace:true});
      const test = await this.file.readAsText(this.file.dataDirectory,filename);
      console.log(test);
    } */
  }
}
