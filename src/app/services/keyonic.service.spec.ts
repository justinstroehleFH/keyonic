import { TestBed } from '@angular/core/testing';

import { KeyonicService } from './keyonic.service';
import { Storage } from '@ionic/storage-angular';
import { StorageMockService } from './mocks/storage-mock.service';
import { Label, Password } from '../libs/types';

describe('KeyonicService', () => {
  let service: KeyonicService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Storage,
          useValue: new StorageMockService(),
        },
      ],
    });
    service = TestBed.inject(KeyonicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should ngOnInit', () => {
    spyOn(service, 'ngOnInit').and.callThrough();
    service.ngOnInit();
    expect(service.ngOnInit).toHaveBeenCalled();
  });

  it('should showToast', () => {
    spyOn(service, 'showToast').and.callThrough();
    service.showToast('message', 1, 'top');
    expect(service.showToast).toHaveBeenCalled();
  });

  it('should generatePassword', () => {
    const generatedPassword = service.generatePassword();
    expect(20).toEqual(generatedPassword.length);
  });

  it('should createStorage', () => {
    service.createStorage();
    const storage = service['storage'];
    const store = (storage as unknown as StorageMockService)['storage'];
    expect(store).toBeDefined();
  });

  it('should saveEntry getPasswordById updateEntry getPasswordsByLabel deleteEntry', async () => {
    service.createStorage();
    let password: Password = {
      id: '1',
      title: 'Test',
      username: 'jasmine',
      password: 'testingIsFun',
      url: 'https://jasmine.github.io/',
      label: ['1'],
    };
    await service.saveEntry(password);
    const passwordById = service.getPasswordById('1');
    expect(password).toEqual(passwordById as Password);

    password.id = '2';
    await service.updateEntry(password);
    const updatedPassword = service.getPasswordsByLabel('1')[0];
    expect((updatedPassword as Password).id).toEqual('2');

    await service.deleteEntry('2');
    const passwords = service['passwords'];
    expect(passwords.length).toEqual(0);
  });

  it('should createLabel getLabels updateLabel getLabelById deleteLabel', async () => {
    service.createStorage();
    let label: Label = {
      id: '-1',
      labelName: 'Testing',
      icon: 'test',
    };
    await service.createLabel(label);
    let labels = service.getLabels();
    expect(labels.length).toEqual(1);
    const updateLabel = labels[0];
    updateLabel.labelName = 'StillTesting';
    await service.editLabel(updateLabel);
    const id = updateLabel.id;
    const labelById = await service.getLabelById(id);
    expect((labelById as Label).id).toEqual(id);
    await service.deleteLabel(id);
    labels = service['labels'];
    expect(labels.length).toEqual(0);
  });

  it('should encryptPassword', () => {
    const password = 'password';
    const expected = 'PhU5ADQkRF0=';
    const actual = service.encryptPassword(password);
    expect(expected).toEqual(actual);
  });

  it('should decryptPassword', () => {
    const hash = 'PhU5ADQkRF0=';
    const expected = 'password';
    const actual = service.decryptPassword(hash);
    expect(expected).toEqual(actual);
  });

  it('should getOperatingSystem', () => {
    const os = service.getOperatingSystem();
    expect(os).toBeDefined();
  });
});
