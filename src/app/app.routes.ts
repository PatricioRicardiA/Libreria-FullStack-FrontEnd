import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookFormComponent } from './book-form/book-form.component';
import { SearchBookComponent } from './search-book/search-book.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Pagina de inicio',
  },
  {
    path: 'book-form/:id',
    component: BookFormComponent,
    title: 'Formulario de libros',
  },
  {
    path: 'book-search/:id',
    component: SearchBookComponent,
    title: 'Buscador de libros',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
