import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Book } from '../Models/book';
import { BookService } from '../Services/book.service';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-book',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    RouterModule,
    ToolbarModule,
    AvatarModule,
    InputTextModule,
    FormsModule,
  ],
  templateUrl: './search-book.component.html',
  styleUrl: './search-book.component.scss',
})
export class SearchBookComponent {
  books: Book[] = [];
  searchTerm: string = '';
  constructor(
    private bookService: BookService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getAllBooks();
  }
  filteredBooks: Array<Book> = [];

  onSearchChange(searchValue: string): void {
    this.filteredBooks = this.books.filter((book) =>
      book.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  getAllBooks() {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }
}
