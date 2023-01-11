import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Password } from '../libs/types';
import { KeyonicService } from '../services/keyonic.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  protected show: boolean = false;
  private entry: Password = {
    id: '-1',
    label: [],
    password: '',
    title: '',
    url: '',
    username: '',
  };
  protected labels: any[] = [];
  public newEntry = true;
  public detailForm!: FormGroup;

  constructor(
    private keyonicService: KeyonicService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    const entryId = this.activatedRoute.snapshot.paramMap.get('hash');
    if (entryId) {
      this.getEntry(entryId);
      const labels = this.keyonicService.getLabels();
      this.labels = labels.map((l) => l.labelName);
      this.labels.shift();
    }
    this.initForms();
  }

  initForms() {
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

  getEntry(entryId: string) {
    const entry = this.keyonicService.getPasswordsById(entryId);
    if (entry) {
      this.entry = entry;
      this.newEntry = false;
    }
  }

  protected counterFormatter(inputLength: number, maxLength: number) {
    return `${inputLength} characters`;
  }

  protected generatePassword() {
    navigator.clipboard.writeText(this.keyonicService.generatePassword());
    this.keyonicService.showToast(
      'generiertes Passwort wurde in die Zwischenablage gespeichert',
      1500,
      'top'
    );
  }

  public async save() {
    if (!this.detailForm.valid) {
      this.keyonicService.showToast(
        'Du Hurensohn füll das Formular aus. Danke',
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

    this.router.navigate(['/']);
  }

  cancel() {
    // TODO save before navigate away popup
    this.router.navigate(['/']);
  }
}
