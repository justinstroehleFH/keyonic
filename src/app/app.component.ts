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
      url: `/label/${label.labelName}`,
      icon: label.icon,
    };
  });

  // TODO Icons adden ??
  /*   public appPages = [
    { title: 'All', url: '/label/all', icon: 'mail' },
    { title: 'Work', url: '/label/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/label/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/label/Archived', icon: 'archive' },
    { title: 'Trash', url: '/label/Trash', icon: 'trash' },
    { title: 'Spam', url: '/label/Spam', icon: 'warning' },
  ]; */
  constructor() {}
}
