import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  protected folder!: string;
  protected selected!: any;
  protected selectedIndex!: number;

  protected passwordArray = [
    {
      title: 'FHV',
      username: 'nto69',
      password: '1234',
      url: 'www.ilias/fhv.at',
      label: 'Uni',
    },
    {
      title: 'ZARA',
      username: 'Shopper3000',
      password: 'z12z',
      url: 'www.zara.at',
      label: 'Shopping',
    },
    {
      title: 'GIT',
      username: 'gitlover420',
      password: 'git4ever',
      url: 'www.github.com',
      label: 'Work',
    },
    {
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
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.displayPasswords = this.passwordArray.filter((e) =>
      this.folder !== 'All' ? e.label === this.folder : e.label != ''
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

  protected editEntry() {
    console.log('TODO');
  }
}
