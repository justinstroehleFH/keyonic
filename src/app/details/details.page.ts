import { Component, OnInit } from '@angular/core';
import { KeyonicService } from '../services/keyonic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  protected show: boolean = false;
  protected labels: any[] = ['Work', 'Uni', 'Shopping'];
  constructor(private keyonicService: KeyonicService) {}

  ngOnInit() {}

  protected counterFormatter(inputLength: number, maxLength: number) {
    return `${inputLength} characters`;
  }

  protected generatePassword() {
    console.log(this.keyonicService.generatePassword());
  }
}
