import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';

import { Book } from './book';
import { BookRaw } from './book-raw';
import { BookFactory } from './book-factory';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  private api = 'https://api4.angular-buch.com/secure';
  books: Book[] = {} as Book[];
  constructor(private http: HttpClient) { 
    /*
    this.books = [
      {
        isbn: '9783864907791',
        title: 'Angular',
        authors: ['Ferdinand Malcher', 'Johannes Hoppe', 'Danny Koppenhagen'],
        published: new Date(2020, 8, 1),
        subtitle: 'Grundlagen, fortgeschrittene Themen und Best Practices',
        rating: 5,
        thumbnails: [{
          url: 'https://ng-buch.de/angular-cover.jpg',
          title: 'Buchcover'
        }],
        description: 'Lernen Sie Angular mit diesem Praxisbuch!'
      },
      {
        isbn: '9783864905520',
        title: 'React',
        authors: ['Oliver Zeigermann', 'Nils Hartmann'],
        published: new Date(2019, 11, 12),
        subtitle: 'Grundlagen, fortgeschrittene Techniken und Praxistipps',
        rating: 3,
        thumbnails: [{
          url: 'https://ng-buch.de/react-cover.jpg',
          title: 'Buchcover'
        }],
        description: 'Das bewaehrte und umfassende Praxisbuch zu React!'
      }
    ]
    */
  }

  getAll(): Observable<Book[]> {
    return this.http.get<BookRaw[]>(`${this.api}/books`)
      .pipe(
        map(booksRaw => 
          booksRaw.map(b => BookFactory.fromRaw(b)))
      );
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<BookRaw>(
      `${this.api}/book/${isbn}`
    ).pipe(
      retry(3),
      map(b => BookFactory.fromRaw(b)),
      catchError(this.errorHandler)
    );
  }

  remove(isbn: string): Observable<any> {
    return this.http.delete(
      `${this.api}/book/${isbn}`,
      { responseType: 'text' }
    );
  }
  
  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Fehler aufgetreten!');
    return throwError(error);
  }

  getAllSearch(searchTerm: string): Observable<Book[]> {
    return this.http.get<BookRaw[]>(
      `${this.api}/books/search/${searchTerm}`
    ).pipe(
      retry(3),
      map(booksRaw => 
        booksRaw.map(b => BookFactory.fromRaw(b)),
      ),
      catchError(this.errorHandler)
    );
  }

  create(book: Book): Observable<any> {
    return this.http.post(
      `${this.api}/book`,
      book,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    )
  }
}
