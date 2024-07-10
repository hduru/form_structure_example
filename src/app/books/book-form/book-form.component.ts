import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Book } from '../models/book.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ToastModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnInit, AfterViewInit  {
  @Input() book: Book | any;
  @Output() closeModal = new EventEmitter<void>();
  @ViewChild('bookForm') bookForm?: NgForm;

  editableBook?: Book;

  ngOnInit(): void {
    this.editableBook = JSON.parse(JSON.stringify(this.book));
  }

  //Form henüz initialize olmadan içine atama yapamıyorum, oninit bittikten sonra forma atama yapıyorum.
  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   if (this.bookForm) {
    //     this.bookForm.setValue({
    //       bookname: this.book.name,
    //       author: this.book.author
    //     });
    //   }
    // }, 0);

    setTimeout(() => {
      if (this.bookForm) {
        this.bookForm?.control.patchValue(this.book); 
      }
    }, 0)

    //this.bookForm?.control.patchValue(this.book); // Book değişkeninde veriler modelimdeki bütün veriler değilse aramayı patchValue kullanıyoruz
  }

  submit() {
    this.book.name = this.editableBook?.name;
    this.book.author = this.editableBook?.author;

    this.closeModal.emit();
  }

  onSubmit(book: NgForm) {
    if(book.valid) {
      this.book.name = book.form.value.name ? book.form.value.name : this.book.name;
      this.book.author = book.form.value.author ? book.form.value.author : this.book.author;
  
      this.closeModal.emit();
    } else {
      console.log("Lütfen gerekli alanları doldurunuz!");
    }
  }

  //Template-driven Form
  //Reactive Form

}
