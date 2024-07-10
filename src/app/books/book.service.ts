import { Injectable } from '@angular/core';
import { Book } from './models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private books: Book[] = [
    { id: 1, name: 'Book 1', author: 'Author A', releaseDate: new Date('2023-01-15') },
    { id: 2, name: 'Book 2', author: 'Author B', releaseDate: new Date('2022-05-20') },
    { id: 3, name: 'Book 3', author: 'Author C', releaseDate: new Date('2024-03-10') }
  ];

  constructor() { }

  getBooks(): Book[] {
    return this.books;
  }



  
}
