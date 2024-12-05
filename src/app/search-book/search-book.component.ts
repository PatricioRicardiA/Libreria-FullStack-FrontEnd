import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Book } from '../Models/book';
import { BookService } from '../Services/book.service';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-search-book',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    CardModule,
    ToolbarModule,
    AvatarModule,
  ],
  templateUrl: './search-book.component.html',
  styleUrl: './search-book.component.scss',
})
export class SearchBookComponent implements OnInit {
  searchValue = '';
  books: Book[] = [];
  searchForm!: FormGroup;

  constructor(private bookService: BookService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchValue: '',
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.bookService
      .getBooksByTitle(this.searchValue)
      .subscribe((bookSearch) => {
        this.books = bookSearch;
      });
  }
  onSearchSubmit(): void {
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.fetchData();
  }
}
