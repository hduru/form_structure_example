import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-form-reactive',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-form-reactive.component.html',
  styleUrl: './book-form-reactive.component.scss'
})
export class BookFormReactiveComponent implements OnInit {
  @Input() book: Book | any;
  @Output() closeModal = new EventEmitter<void>();


  _formBuilder: FormBuilder;
  formGroup:FormGroup;
  
  constructor() {
    this._formBuilder = inject(FormBuilder); //init

    this.formGroup = this._formBuilder?.group({
      name : new FormControl('', Validators.required),
      author : new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.formGroup.patchValue(this.book);
  }

  onSubmit(item: Book) {
    if(this.formGroup.valid) {
      this.book.name = item.name ? item.name : this.book.name;
      this.book.author = item.author ? item.author : this.book.author;
  
      this.closeModal.emit();
    } else {
      console.log("Lütfen gerekli alanları doldurunuz!");
    }
  }
}

//Form Builder : formu temsil eden yapı
//Form group : formun içindeki elementleri bir arada tutan yapı
//Form Control : Her bir element