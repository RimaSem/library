let myLibrary = ["dog", "cat", "bird"];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = () => {
    if (this.read === true) {
      return `${this.title} by ${this.author}, ${this.pages} pages, already read`;
    }
    return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  for (let book of myLibrary) {
    console.log(book);
  }
}

displayBooks();

// const newBook = new Book("Harry Potter", "J.K.Rowling", 257, true);

// console.log(newBook.title);
