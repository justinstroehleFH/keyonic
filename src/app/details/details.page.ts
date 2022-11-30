import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  protected show: boolean = false;
  protected labels: any[] = ['Work', 'Uni', 'Shopping'];
  constructor() {}

  ngOnInit() {}

  counterFormatter(inputLength: number, maxLength: number) {
    return `${inputLength} characters`;
  }

  generatePassword() {

   const base = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = '';
   for (let index = 0; index < 20; index++) {
    const randomChar = base.charAt(this.getRandomInt(base.length));
    password = password.concat(randomChar);
   }
      console.log(password);
    }

    getRandomInt(max: number) {
      return Math.floor(Math.random() * max);
    }

}
