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
    console.log('generate');
  }
}
