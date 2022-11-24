import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;

  public passworstArray = [
    { name: 'FHV', password: '1234', url: 'www.ilias/fhv.at', label: 'Uni' },
    { name: 'ZARA', password: 'z12z', url: 'www.zara.at', label: 'Shopping' },
    { name: 'GIT', password: 'git4ever', url: 'www.github.com', label: 'Work' },
    {
      name: 'ProTask',
      password: 'proNeverGonnaDie',
      url: 'www.protask.com',
      label: 'Work',
    },
  ];

  public displayPasswords: any = [];
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.displayPasswords = this.passworstArray.filter((e) =>
      this.folder !== 'All' ? e.label === this.folder : e.label != ''
    );
  }
}
