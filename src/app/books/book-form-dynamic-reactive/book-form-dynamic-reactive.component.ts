import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseFormComponent } from '../../infrastructure/base-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Book } from '../models/book.model';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-book-form-dynamic-reactive',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './book-form-dynamic-reactive.component.html',
  styleUrl: './book-form-dynamic-reactive.component.scss',
  providers: [MessageService]
})
export class BookFormDynamicReactiveComponent extends BaseFormComponent implements OnInit {
  _isFormValid: boolean = true;

  @Input() book: Book | any;
  @Output() closeModal = new EventEmitter<boolean>();

  constructor() {
    super();

    this.formControlTemplate = [
      {
        key: 'name',
        label: 'Book Name',
        required: true,
        minLength: 3,
        maxLength: 50
      },
      {
        key: 'author',
        label: 'Book Author',
        required: true,
        minLength: 3,
        maxLength: 50
      }
    ]
  }

  ngOnInit(): void {
    this.setForm(this.book)
  }

  onSubmit(item: Book) {
    console.log("dynamic-reactive component", this.formGroup)
    if (this.formGroup.valid) {
      this.book.name = item.name ? item.name : this.book.name;
      this.book.author = item.author ? item.author : this.book.author;

    } else {
      this._isFormValid = false;
    }

    this.closeModal.emit(this._isFormValid);

  }

}
