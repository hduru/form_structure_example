import { Component, inject, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { BookService } from '../book.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookFormComponent } from '../book-form/book-form.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BookFormReactiveComponent } from "../book-form-reactive/book-form-reactive.component";
import { BookFormDynamicReactiveComponent } from "../book-form-dynamic-reactive/book-form-dynamic-reactive.component";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, BookFormComponent, DialogModule, ButtonModule, BookFormReactiveComponent, BookFormDynamicReactiveComponent, ToastModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
  providers: [MessageService]
})
export class BookListComponent implements OnInit {
 
  searchKey?:string;
  bookList: Book[] = [];
  copyBookList: Book[] = [];
  openModal: boolean = false;
  selectedBook?: Book;
  _bookService: BookService;

  constructor(private messageService: MessageService) {
    this._bookService = inject(BookService);
  }


  ngOnInit(): void {
    this.bookList = this._bookService.getBooks();
    this.copyBookList = JSON.parse(JSON.stringify(this.bookList)) as Book[];
  }

  keyUpForEnterClick(event:any) {
      this.copyBookList = JSON.parse(JSON.stringify({...this.bookList.filter( (el) => {
        return el.name.includes(this.searchKey??'');
      })})) as Book[]; //TO DO
  }

  changedName() {
    this.copyBookList![0].name = "Changed Book Name"
  }

  editBook(item:Book) {
    this.openModal = true
    this.selectedBook = item;
  }

  handleCloseModal(isFormValid: boolean) {
    if(isFormValid) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Book information updated successfully!' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill out the required fields!' });
    }

    this.openModal = false;
  }

}
