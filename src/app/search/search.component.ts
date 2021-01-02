import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, tap, switchMap, takeUntil } from 'rxjs/operators';

import { BookStoreService } from '../shared/book-store.service';

import { Book } from '../shared/book';

@Component({
  selector: 'bm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  keyUp$ = new Subject<string>();
  isLoading = false;
  foundBooks: Book[] = [];

  constructor(private bs: BookStoreService) { }

  ngOnInit(): void {
    const myObservable$ = new Observable(subscriber => {
      subscriber.next(1);
      setTimeout(() => subscriber.next(2),2000);
      setTimeout(() => subscriber.next(3),4000);
      setTimeout(() => subscriber.next(4),6000);
      setTimeout(() => subscriber.next(5),8000);
      setTimeout(() => subscriber.complete(),16000);
    });

    myObservable$.pipe(
                  takeUntil(this.destroy$)
                  ).subscribe(e => console.log(e));
    
    this.keyUp$.pipe(
      filter(term => term.length >= 3),
      debounceTime(500), 
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchTerm => this.bs.getAllSearch(searchTerm)),
      tap(() => this.isLoading = false)
    )
    .subscribe(books => this.foundBooks = books);
  }
  
  ngOnDestroy() {
    this.destroy$.next();
  }
}
