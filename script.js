const booksDisplay = document.querySelector(".books");
const addBookBtn = document.querySelector("header button");
const formContainer = document.querySelector(".form-container");
const form = document.querySelector("#myForm");
const closeFormBtn = document.querySelector(".form-header img");
const formTitle = document.querySelector(".form-title");
const formBtn = document.querySelector(".add-btn");

let myLibrary = [];
let currentBook = {};

// create html elements
function makeElement(type = "div", textContent = "", className = "") {
  const element = document.createElement(type);
  element.className = className;
  element.textContent = textContent;
  return element;
}

// create a book object
function Book(title, author, pages, yearPublished, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.yearPublished = yearPublished;
  this.read = read;
}

// add book object to myLibrary array
function addBookToLibrary(title, author, pages, yearPublished, read) {
  const myBook = new Book(title, author, pages, yearPublished, read);
  myLibrary.push(myBook);
}

// add sample books to the page
addBookToLibrary("Pride and Prejudice", "Jane Austen", 259, 1813, true);
addBookToLibrary("Wuthering Heights", "Emily Brontë", 272, 1847, true);
addBookToLibrary("A Room of One's Own", "V. Woolf", 172, 1929, false);

// create html elements for a book card
function createElements(book) {
  const bookCard = makeElement("div", "", "book-card");
  const title = makeElement("h2", `${book.title}`);

  const bookContent = makeElement("div", "", "card-content");

  bookContent.innerHTML = `<div class="card-content-line"><div class="card-content-left">Author:</div><div class="book-author">${book.author}</div></div>
  <div class="card-content-line"><div class="card-content-left">Pages:</div><div class="book-pages">${book.pages}</div></div>
  <div class="card-content-line"><div class="card-content-left">Published:</div><div class="book-published">${book.yearPublished}</div></div>
  <div class="card-content-line"><div class="card-content-left">Read?</div><img src="img/checkbox-marked.svg" width="24px" /></div>`;

  // read toggle
  if (book.read === false) {
    bookContent.querySelector(".card-content-line img").style.display = "none";
  } else {
    bookContent.querySelector(".card-content-line img").style.display = "block";
  }

  // button section
  const btnContainer = makeElement("div", "", "book-card-buttons");
  const deleteBtn = makeElement("button", "Delete", "delete-btn");
  const editBtn = makeElement("button", "Edit", "edit-btn");
  btnContainer.appendChild(deleteBtn);
  btnContainer.appendChild(editBtn);

  deleteBtn.addEventListener("click", () => {
    // remove book from array
    myLibrary = myLibrary.filter((item) => item !== book);
    // remove book from page
    booksDisplay.removeChild(bookCard);
  });

  editBtn.addEventListener("click", () => {
    // populate form with book data
    form[0].value = book.title;
    form[1].value = book.author;
    form[2].value = book.pages;
    form[3].value = book.yearPublished;
    form[4].checked = book.read;
    form[5].textContent = "Save";
    // this variable is used when saving the edited book
    currentBook = book;
    // change form title and button
    formTitle.textContent = "Edit this book";
    formContainer.style.display = "block";
  });

  bookCard.appendChild(title);
  bookCard.appendChild(bookContent);
  bookCard.appendChild(btnContainer);
  booksDisplay.appendChild(bookCard);
}

// display created books on the page
function displayBooks() {
  booksDisplay.innerHTML = "";
  for (const book of myLibrary) {
    createElements(book);
  }

  // create a plus button card for adding books
  const plusCard = makeElement("div", "+", "plus-card");
  plusCard.innerHTML = '<img src="img/plus-box.svg" alt="add-book box" />';
  plusCard.addEventListener("click", () => {
    form.reset();
    form[5].textContent = "Add";
    formTitle.textContent = "Add a new book";
    formContainer.style.display = "block";
  });
  booksDisplay.appendChild(plusCard);
}

displayBooks();

formBtn.addEventListener("click", (e) => {
  if (e.target.innerText === "Add" && form.checkValidity()) {
    addBookToLibrary(
      form[0].value,
      form[1].value,
      form[2].value,
      form[3].value,
      form[4].checked
    );
    form.reset();
    formContainer.style.display = "none";
    // re-build page
    displayBooks();
  } else if (e.target.innerText === "Save" && form.checkValidity()) {
    // find index of the book currently being edited
    const index = myLibrary.indexOf(currentBook);
    myLibrary[index].title = form[0].value;
    myLibrary[index].author = form[1].value;
    myLibrary[index].pages = form[2].value;
    myLibrary[index].yearPublished = form[3].value;
    myLibrary[index].read = form[4].checked;
    // re-build page
    form.reset();
    formContainer.style.display = "none";
    displayBooks();
  }
});

// show form
addBookBtn.addEventListener("click", () => {
  form.reset();
  form[5].textContent = "Add";
  formTitle.textContent = "Add a new book";
  formContainer.style.display = "block";
});

// close form
closeFormBtn.addEventListener("click", () => {
  formContainer.style.display = "none";
  form.reset();
});
