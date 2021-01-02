import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookFactory } from '../shared/book-factory';
import { Book } from '../shared/book';

@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  book = BookFactory.empty();

  @Output() submitBook = new EventEmitter<Book>();
  @ViewChild('bookForm', { static: true }) bookForm: NgForm = {} as NgForm;

  submitForm() {
    this.submitBook.emit(this.book);

    this.book = BookFactory.empty();
    this.bookForm.reset();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
