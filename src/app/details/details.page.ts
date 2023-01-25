import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Label, Password } from '../libs/types';
import { KeyonicService } from '../services/keyonic.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public show: boolean = false;
  private entry: Password = {
    id: '-1',
    label: [],
    password: '',
    title: '',
    url: '',
    username: '',
  };
  protected labels: Label[] = [];
  public newEntry = true;
  public detailForm!: FormGroup;

  constructor(
    private keyonicService: KeyonicService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const entryId = this.activatedRoute.snapshot.paramMap.get('hash');
    if (entryId) {
      this.getEntry(entryId);
      this.labels = this.keyonicService.getLabels();
    }
    this.initForms();
  }

  private initForms() {
    let title = '';
    let username = '';
    let password = '';
    let url = '';
    let label: string[] = [];

    if (this.entry) {
      title = this.entry.title;
      username = this.entry.username;
      password = this.keyonicService.decryptPassword(this.entry.password);
      url = this.entry.url;
      label = this.entry.label;
    }

    this.detailForm = this.formBuilder.group(
      {
        title: [title, [Validators.required]],
        username: [username, [Validators.required]],
        label: [label, [Validators.required]],
        password: [password, [Validators.required]],
        repeat: [password, [Validators.required]],
        url: [url],
      },
      {
        validators: DetailsPage.matchPassword,
      }
    );
  }

  static matchPassword(form: AbstractControl) {
    return form.get('password')?.value == form.get('repeat')?.value
      ? null
      : { equals: true };
  }

  private getEntry(entryId: string) {
    const entry = this.keyonicService.getPasswordById(entryId);
    if (entry) {
      this.entry = entry;
      this.newEntry = false;
    } else {
      this.newEntry = true;
    }
  }

  public counterFormatter(inputLength: number, maxLength: number) {
    return `${inputLength} characters`;
  }

  public generatePassword() {
    let generatedPassword = this.keyonicService.generatePassword();
    this.detailForm.patchValue({
      password: generatedPassword,
      repeat: generatedPassword,
    });
  }

  public repeatPassword() {
    if (this.show) {
      let password = this.detailForm.get(['password'])?.value;
      this.detailForm.patchValue({
        repeat: password,
      });
    }
  }

  public async save() {
    if (!this.detailForm.valid) {
      this.keyonicService.showToast(
        'Please fill in all relevant fields!',
        1500,
        'top'
      );
      return;
    }

    const password: Password = {
      id: this.entry.id,
      label: this.detailForm.get(['label'])?.value,
      username: this.detailForm.get(['username'])?.value,
      password: this.keyonicService.encryptPassword(
        this.detailForm.get(['password'])?.value
      ),
      url: this.detailForm.get(['url'])?.value,
      title: this.detailForm.get(['title'])?.value,
    };
    if (this.newEntry) {
      const newId = uuidv4();
      password.id = newId;
      await this.keyonicService.saveEntry(password);
    } else {
      await this.keyonicService.updateEntry(password);
    }
    this.resetForm();
    //TODO change to previous url (label)
    this.router.navigate(['/']);
  }

  public async cancel() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want cancel?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          role: 'confirm',
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role === 'cancel') return;
    this.router.navigate(['/']);
  }

  private resetForm() {
    this.entry = {
      id: '-1',
      label: [],
      password: '',
      title: '',
      url: '',
      username: '',
    };
    this.detailForm.patchValue({
      label: [],
      password: '',
      repeat: '',
      title: '',
      url: '',
      username: '',
    });
  }
}
