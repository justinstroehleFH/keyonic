import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Password } from '../libs/types';
import { KeyonicService } from '../services/keyonic.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.page.html',
  styleUrls: ['./label.page.scss'],
})
export class LabelPage implements OnInit {
  protected label!: string;
  protected selected!: any;
  protected selectedIndex!: number;

  protected passwords!: Password[];
  protected displayedPasswords!: Password[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private keyonicService: KeyonicService
  ) {}

  ngOnInit() {
    this.label = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.passwords = this.keyonicService.getPasswords(this.label);
    this.displayedPasswords = this.passwords;
  }

  protected createEntry() {
    //TODO
  }

  protected select(entry: any, index: number) {
    this.selected = entry;
    this.selectedIndex = index;
  }

  protected contextClick(event: Event) {
    event.preventDefault();
    console.log('TODO POPOVER');
  }

  protected async copyUsername() {
    navigator.clipboard.writeText(this.selected.username);
    this.keyonicService.showToast('Username copied!', 1500, 'top');
  }

  protected async copyPassword() {
    navigator.clipboard.writeText(this.selected.password);
    this.keyonicService.showToast('Password copied!', 1500, 'top');
  }

  protected openURL() {
    // window.open(this.selected.url);
    console.log('OPENURL EY');
    this.keyonicService.hashPassword();
  }

  protected test() {
    console.log('OPENURL EY');
    this.keyonicService.hashPassword();
  }

  protected searchEntry(event: Event) {
    const query = (event as CustomEvent).detail.value.toLowerCase();
    this.displayedPasswords = this.passwords.filter(
      (e) =>
        (this.label !== 'All' ? e.label.includes(this.label) : true) &&
        e.title.toLowerCase().indexOf(query) > -1
    );
  }
}
