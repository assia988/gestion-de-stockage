import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../models/file.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  public books: Book[];
  currentUserEmail: string;
  booksSubscription: Subscription;

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        firebase.auth().onAuthStateChanged(user => {
          let userBooks = []
          if(user) {
            this.currentUserEmail = user.email
            // console.log("currentUserEmail", user.email)

            for (let i = 0; i < books.length; i++) { 
              if (books[i].currentUserEmail == this.currentUserEmail) {
                userBooks.push(books[i]);
              } else {
                userBooks.push(new Book("empty"));
              }
            }
            this.books = userBooks;
            // console.log("books", userBooks)
          }
        })
      }
    );
    this.booksService.emitBooks();
  }

  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book) {
    this.booksService.removeBook(book);
  }

  onViewBook(id: number) {
    // console.log("id", id)
    this.router.navigate(['/books', 'view', id]);
  }
  
  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }
}