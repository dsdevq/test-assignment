import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DynamicDialogConfig,
  DynamicDialogModule,
} from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { IBook } from 'src/app/shared/models/book.interfaces';
import { shallowEqual } from './dialog.utils';
import { BooksFacadeService } from '../../books-facade.service';

interface TBookWithIndex extends IBook {
  index: number;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DynamicDialogModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  public form: FormGroup;

  private get defaultBookData(): TBookWithIndex | undefined {
    return this.config.data;
  }

  private changedBookData = this.defaultBookData;

  constructor(
    private booksService: BooksFacadeService,
    private config: DynamicDialogConfig<TBookWithIndex>,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        title: [this.defaultBookData?.title ?? '', Validators.required],
        description: [
          this.defaultBookData?.description ?? '',
          Validators.required,
        ],
        pageCount: [this.defaultBookData?.pageCount ?? 0, Validators.required],
        publishDate: [
          this.defaultBookData?.publishDate ?? '',
          Validators.required,
        ],
        excerpt: [this.defaultBookData?.excerpt ?? ''],
      },
      {
        validators: (control: AbstractControl): ValidationErrors | null => {
          if (!this.defaultBookData) return null;
          const { id, index, ...defaultValue } = this.changedBookData;
          const result = shallowEqual(control.value, defaultValue);
          return result ? { result } : null;
        },
      }
    );
  }

  public handleSubmit(): void {
    if (!this.defaultBookData) {
      this.booksService.addBook(this.form.value as IBook);
      return;
    }
    const book = { ...(this.form.value as IBook), id: this.defaultBookData.id };
    this.booksService.editBook(book, this.defaultBookData.index);
    this.changedBookData = { ...this.form.value };
    this.form.updateValueAndValidity();
  }

  public handleReset(): void {
    this.form.patchValue({
      title: this.defaultBookData?.title ?? '',
      description: this.defaultBookData?.description ?? '',
      pageCount: this.defaultBookData?.pageCount ?? 0,
      publishDate: this.defaultBookData?.publishDate ?? '',
      excerpt: this.defaultBookData?.excerpt ?? '',
    });
    this.handleSubmit();
  }
}
