import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../models/file.model';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';

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
  extension: string;
  taille : number;
  lienTele : string;
  fileUploaded = false;
  constructor(private formBuilder: FormBuilder, private booksService: BooksService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
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
    if(this.fileUrl && this.fileUrl !== '') {
      newBook.fileUrl = this.fileUrl;
      newBook.fbShareLink = this.fbShareLink;
    }
    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books']);
}
onUploadFile(file: File) {
  this.fileIsUploading = true;
  this.booksService.uploadFile(file).then(
    (url: string) => {
      this.fileUrl = url;
      this.fbShareLink = "https://www.facebook.com/sharer/sharer.php?u="+url;
      this.lienTele = url;
      this.taille = file.size;
      this.type = file.type;
      this.extension = this.detectExtension(file.name)
      this.fileIsUploading = false;
      this.fileUploaded = true;
      console.log(file)
    }
  );
}
detectFiles(event) {
  this.onUploadFile(event.target.files[0]);
}
}

