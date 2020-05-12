import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/file.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

  book: Book;
  num = 0;
  constructor(private route: ActivatedRoute, private booksService: BooksService,
              private router: Router) {}

  ngOnInit() {
    this.book = new Book('');
    const id = this.route.snapshot.params['id'];
    // console.log("received id", id)
    this.booksService.getSingleBook(+id).then(
      (book: Book) => {
        // console.log("book", book)
        this.book = book;
        if(book.type === "application/pdf"){
          this.num=1;
        }
        else if(book.type ==="application/msword"){
          this.num=2;

        }
        else if(book.type.includes("image")){
          this.num=3;
        }
        else if(book.type.includes("video")){
          this.num=4;
        }
        else if(book.type.includes("audio")){
          this.num=5;
        }
      }
    );
  }

  onBack() {
    this.router.navigate(['/books']);
  }
}