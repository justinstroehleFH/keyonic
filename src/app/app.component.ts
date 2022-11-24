import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public labels = [
    { labelName: 'All', icon: 'list' },
    { labelName: 'Work', icon: 'business' },
    { labelName: 'Uni', icon: 'school' },
    { labelName: 'Shopping', icon: 'bag' },
  ];

  public displayLabels = this.labels.map((label) => {
    return {
      title: label.labelName,
      url: `/folder/${label.labelName}`,
      icon: label.icon,
    };
  });

  // TODO Icons adden ??
  /*   public appPages = [
    { title: 'All', url: '/folder/all', icon: 'mail' },
    { title: 'Work', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ]; */
  constructor() {}
}
