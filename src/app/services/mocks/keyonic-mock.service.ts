import { Injectable } from '@angular/core';
import { Label, Password } from 'src/app/libs/types';
import { KeyonicService } from '../keyonic.service';

@Injectable({
  providedIn: 'root',
})
export class KeyonicMockService {
  constructor() {}
  ngOnInit(): void {}

  public generatePassword(): string {
    return 'generatedPassword';
  }

  public showToast(
    message: string,
    duration: number,
    position: 'top' | 'bottom' | 'middle' | undefined
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public createStorage(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public createLabel(label: Label): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public getPasswordsByLabel(filter: string): Password[] {
    return [
      {
        id: 'id',
        title: 'title',
        username: 'username',
        password: 'password',
        url: 'url',
        label: [filter],
      },
    ];
  }

  public getPasswordById(id: string): Password | undefined {
    if (id) {
      return {
        id: id,
        title: 'title',
        username: 'username',
        password: 'password',
        url: 'url',
        label: ['label'],
      };
    } else {
      return undefined;
    }
  }

  public getLabels(): Label[] {
    return [
      {
        id: 'id',
        labelName: 'labelName',
        icon: 'icon',
      },
    ];
  }
  public getLabelById(id: string | undefined): Label | undefined {
    if (id) {
      return {
        id: id,
        labelName: 'labelName',
        icon: 'icon',
      };
    } else {
      return undefined;
    }
  }

  public saveEntry(password: Password): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public deleteEntry(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  updateEntry(password: Password): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public editLabel(label: Label): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public deleteLabel(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public encryptPassword(password: string): string {
    return password + 'encrypt';
  }

  public decryptPassword(hash: string): string {
    return hash + 'decrypt';
  }
}
