import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';

import { Book } from '../shared/book';

@Component({
  selector: 'bm-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  constructor(
    private bs: BookStoreService,
    private route: ActivatedRoute,
    private router: Router    
  ) { }

  ngOnInit(): void {
  }

  createBook(book: Book) {
    this.bs.create(book).subscribe(() => {
      this.router.navigate(['../..', 'books'], { relativeTo: this.route });
    })
  }

}
