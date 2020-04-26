export class Book {
    extension : string;
    taille : number;
    type : string;
    liennTelecharg : string;
    fileUrl : string;
    fbShareLink: string;
    currentUserEmail: string;
    constructor(public title: string) {
    }
  }