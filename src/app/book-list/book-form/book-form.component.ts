import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../models/file.model';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fbShareLink: string;
  type: string; 
  currentUserEmail: string;
  extension: string;
  taille : number;
  lienTele : string;
  fileUploaded = false;
  availableStorageSize = 100; // MB
  errorStorageSpace: string;
  public books: Book[];
  constructor(private formBuilder: FormBuilder, private booksService: BooksService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.currentUserEmail = user.email
        // console.log("currentUserEmail", user.email)
        firebase.database().ref('/books').on('value', (data) => {
          this.books = data.val() ? data.val() : [];

          for (let i = this.books.length -1 ; i >= 0; i--) { 
            if (this.books[i].currentUserEmail == this.currentUserEmail) {
              this.availableStorageSize = this.books[i].availableStorageSize;
              break;
            }
          }
        });
      }
    })
  }
  
  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  detectExtension(fileName) {
    const index = fileName.indexOf(".")
    return fileName.substring(index)
  }
  
  onSaveBook() {
    const title = this.bookForm.get('title').value;
    const newBook = new Book(title);
    newBook.extension = this.extension;
    newBook.taille = this.taille;
    newBook.type = this.type;
    newBook.liennTelecharg = this.lienTele;
    newBook.currentUserEmail = this.currentUserEmail;
    if(this.fileUrl && this.fileUrl !== '') {
      newBook.fileUrl = this.fileUrl;
      newBook.fbShareLink = this.fbShareLink;
    }
    if (this.availableStorageSize !== 0) {
      newBook.availableStorageSize = this.availableStorageSize
      this.errorStorageSpace = ""
      this.booksService.createNewBook(newBook);
      this.router.navigate(['/books']);
    } else {
      this.errorStorageSpace = "You do not have enough storage space"
    }
}
onUploadFile(file: File) {
  this.fileIsUploading = true;
  this.booksService.uploadFile(file).then(
    (url: string) => {
      this.fileUrl = url;
      this.fbShareLink = "https://www.facebook.com/sharer/sharer.php?u="+url;
      this.lienTele = url;
      this.taille = file.size / 1000000;
      this.type = file.type;
      this.extension = this.detectExtension(file.name)
      this.fileIsUploading = false;
      this.fileUploaded = true;
      this.availableStorageSize = ((this.availableStorageSize * 1000000) > file.size ? ((this.availableStorageSize * 1000000) - file.size)  / 1000000 : 0)
      console.log(this.taille)
    }
  );
}
detectFiles(event) {
  this.onUploadFile(event.target.files[0]);
}
}

