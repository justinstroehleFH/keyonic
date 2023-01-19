import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageMockService {
  private storage: Map<String, Object[]> | undefined;
  constructor() {}
  create(): Promise<void> {
    return new Promise<any>((resolve) => {
      this.storage = new Map();
      this.storage.set('passwords', []);
      this.storage.set('labels', []);
    });
  }
  get(key: string): Promise<any> {
    return new Promise<any>((resolve) => {
      resolve(this.storage?.get(key));
    });
  }
  set(key: string, value: any): Promise<any> {
    return new Promise<any>((resolve) => {
      resolve(this.storage?.set(key, value));
    });
  }
}
