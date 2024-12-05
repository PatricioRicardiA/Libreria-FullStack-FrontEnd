import { Component } from '@angular/core';
import { BookService } from '../Services/book.service';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    InputNumberModule,
    CardModule,
    ToolbarModule,
    AvatarModule,
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent {
  formBook!: FormGroup;
  isSaveInProgress: Boolean = false;
  edit: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {
    this.formBook = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      author: ['', Validators.required],
      pages: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.edit = true;
      this.getBookById(+id!);
    }
  }

  getBookById(id: number) {
    this.bookService.getBookById(id).subscribe({
      next: (foundBook) => {
        this.formBook.patchValue(foundBook);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se encontro el libro',
        });
        this.router.navigateByUrl('/');
      },
    });
  }

  saveBook() {
    if (this.formBook.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'formulario invalido',
      });
      return;
    }
    this.isSaveInProgress = true;
    this.bookService.saveBook(this.formBook.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Se creo libro correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear el libro',
        });
        this.router.navigateByUrl('/');
      },
    });
  }
  updateBook() {
    if (this.formBook.invalid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Message Content',
      });
      return;
    }
    this.isSaveInProgress = true;
    this.bookService.updateBook(this.formBook.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Actualizado',
          detail: 'Se actualizo el libro correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear el libro',
        });
        this.router.navigateByUrl('/');
      },
    });
  }
}
