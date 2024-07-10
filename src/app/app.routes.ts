import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'books/list', loadComponent: () => import('./books/book-list/book-list.component').then(m => m.BookListComponent) } //Lazy load
    //{path: 'books/list', component: BookListComponent} //Load
];
