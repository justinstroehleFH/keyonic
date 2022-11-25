import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-label',
  templateUrl: './label.page.html',
  styleUrls: ['./label.page.scss'],
})
export class LabelPage implements OnInit {
  protected label!: string;
  protected selected!: any;
  protected selectedIndex!: number;

  protected passwordArray = [
    {
      id: '1',
      title: 'FHV',
      username: 'nto69',
      password: '1234',
      url: 'www.ilias/fhv.at',
      label: 'Uni',
    },
    {
      id: '2',
      title: 'ZARA',
      username: 'Shopper3000',
      password: 'z12z',
      url: 'www.zara.at',
      label: 'Shopping',
    },
    {
      id: '3',
      title: 'GIT',
      username: 'gitlover420',
      password: 'git4ever',
      url: 'www.github.com',
      label: 'Work',
    },
    {
      id: '4',
      title: 'ProTask',
      username: 'PT_JST',
      password: 'proNeverGonnaDie',
      url: 'www.protask.eu',
      label: 'Work',
    },
  ];

  protected displayPasswords: any = [];
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.label = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.displayPasswords = this.passwordArray.filter((e) =>
      this.label !== 'All' ? e.label === this.label : e.label != ''
    );
  }

  protected select(entry: any, index: number) {
    this.selected = entry;
    this.selectedIndex = index;
  }

  protected contextClick(event: Event) {
    event.preventDefault();
    console.log('TODO POPOVER');
  }

  protected copyUsername() {
    navigator.clipboard.writeText(this.selected.username);
  }

  protected copyPassword() {
    navigator.clipboard.writeText(this.selected.password);
  }

  protected openURL() {
    window.open(this.selected.url);
  }

  protected searchEntry(event: Event) {
    const query = (event as CustomEvent).detail.value.toLowerCase();
    this.displayPasswords = this.passwordArray.filter((e) =>
      this.label !== 'All'
        ? e.label === this.label
        : e.label != '' && e.title.toLowerCase().indexOf(query) > -1
    );
  }
}
