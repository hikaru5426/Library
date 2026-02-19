const bookshelf = document.querySelector("#bookshelf");
const btnAddBook = document.querySelector("#btn-addBook");

const dialogAddBook = document.querySelector("#dialog-addBook");
const formAddBook = document.querySelector("#form-addBook");
const btnClose = document.querySelector("#close-btn");
const authorInput = document.querySelector("#author-input");
const titleInput = document.querySelector("#title-input");
const nbPagesInput = document.querySelector("#nbPages-input");
const readInput = document.querySelector("#read-input");
const btnConfirm = document.querySelector("#confirm-btn");




class Book {
    static myLibrary = [];

    constructor(title, author, pages, read) {

        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
        Book.myLibrary.push(this);
    }

    static removeBook(idToRemove) {
        Book.myLibrary = Book.myLibrary.filter(book => book.id !== idToRemove);
        Book.displayBooks();
    }

    static switchReadValue(idToSwitch) {
        Book.myLibrary = Book.myLibrary.map(book =>
            book.id === idToSwitch
                ? { ...book, read: !book.read }
                : book
        );
        Book.displayBooks();
    }

    static displayBooks() {
        bookshelf.replaceChildren();
        for (const book of Book.myLibrary) {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");

            const btnRemoveBook = document.createElement("button");
            btnRemoveBook.classList.add("btn-removeBook");
            btnRemoveBook.textContent = "X";
            bookDiv.appendChild(btnRemoveBook);

            const title = document.createElement("div");
            title.classList.add("title");
            title.textContent = "title : " + book.title;
            bookDiv.appendChild(title);

            const author = document.createElement("div");
            author.classList.add("author");
            author.textContent = "author : " + book.author;
            bookDiv.appendChild(author);

            const pages = document.createElement("div");
            pages.classList.add("pages");
            pages.textContent = "pages : " + book.pages;
            bookDiv.appendChild(pages);

            const btnRead = document.createElement("button");
            btnRead.classList.add("btnRead");
            if (book.read === true) {
                btnRead.textContent = "Read";
                btnRead.style.backgroundColor = "green";
            } else {
                btnRead.textContent = "Not read";
                btnRead.style.backgroundColor = "red";
            }

            bookDiv.appendChild(btnRead);

            const id = document.createElement("div");
            id.classList.add("id");
            id.textContent = "id : " + book.id;
            bookDiv.appendChild(id);

            bookDiv.dataset.id = book.id;

            bookshelf.appendChild(bookDiv);
        }
    }
}

bookshelf.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-removeBook")) {
        const book = e.target.closest(".book");
        Book.removeBook(book.dataset.id);
    } else if (e.target.classList.contains("btnRead")) {
        const book = e.target.closest(".book");
        Book.switchReadValue(book.dataset.id);
    }
})

btnAddBook.addEventListener("click", () => {
    dialogAddBook.showModal();
})

btnClose.addEventListener("click", () => {
    dialogAddBook.close();
})

btnConfirm.addEventListener("click", (e) => {
    let readValue;
    if (readInput.checked) {
        readValue = true;
    } else {
        readValue = false;
    }
    new Book(authorInput.value, titleInput.value, nbPagesInput.value, readValue);
    Book.displayBooks();
    e.preventDefault();
    dialogAddBook.close();
    formAddBook.reset();
})

new Book("Cendrillon", "Charles Perrault", 112, false);
new Book("Dune", "Frank Herbert", 826, false);
new Book("Le Tour du monde en quatre-vingts jours", "Jules Verne", 371, true);
new Book("Le Comte de Monte-Cristo", "Alexandre Dumas", 1889, true);
new Book("The Hobbit", "J.R.R. Tolkien", 310, false);
new Book("Madame Bovary", "Gustave Flaubert", 468, false);

Book.displayBooks();