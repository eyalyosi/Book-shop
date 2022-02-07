'use strict'

const BOOKID_KEY = 'bookIdDB'
const STORAGE_KEY = 'booksDB'
var gBooks
const PAGE_SIZE = 5
let gPageIdx = 0

_createBooks()


function setBookSort(sortBy, descending) {
    if (sortBy === 'price') {
        gBooks.sort((book1, book2) => (book1.price - book2.price) * descending)
    }
    if (sortBy === 'title') {
        gBooks.sort((book1, book2) => book1.title.localeCompare(book2.title) * descending)
    }
    renderBooks()
}

function addBook(newBookName, newBookPrice) {
    const book = _createBook(newBookName, newBookPrice)
    gBooks.unshift(book)
    _saveBooksToStorage()
    return book
}

function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function updateBookRate(bookId, rate) {
    const book = gBooks.find(book => bookId === book.id)
    book.rate = rate
    _saveBooksToStorage()
}

function updateBook(bookId, newPrice) {
    //TODO :cannot enter minus
    const book = gBooks.find(book => bookId === book.id)
    book.price = newPrice
    _saveBooksToStorage()
    return book
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function getBooks() {
    const startIdx = gPageIdx * PAGE_SIZE
    const books = gBooks.slice(startIdx,startIdx + PAGE_SIZE)
    return books
}

function getNextBookId() {
    var id = loadFromStorage(BOOKID_KEY)
    if (!id) {
        id = 0
    }
    id++
    saveToStorage(BOOKID_KEY, id)
    return id
}

function _createBook(title, price, imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Book_stub_img.svg', description = makeLorem(40), rate = 0) {
    return {
        id: getNextBookId(),
        title,
        price,
        imgUrl,
        description,
        // description: description || makeLorem()
        rate
    }
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = [
            _createBook('Meir Shalev - Two She-Bears', 80, './img/tow-she-bears.jpg', ' “In the year 1930 three farmers committed suicide here . . . but contrary to the chronicles of our committee and the conclusions of the British policeman, the people of the moshava knew that only two of the suicides had actually taken their own lives, whereas the third suicide had been murdered.” This is the contention of Ruta Tavori, a high school teacher and independent thinker in this small farming community who is writing seventy years later about that murder, about two charismatic men she loves and is trying to forgive—her grandfather and her husband—and about her son, whom she mourns and misses. In a story rich with the grit, humor, and near-magical evocation of Israeli rural life for which Meir Shalev is beloved by readers, Ruta weaves a tale of friendship between men, and of love and betrayal, which carries us from British Palestine to present-day Israel, where forgiveness, atonement, and understanding can finally happen.'),
            _createBook('Eshkol Nevo - Three floors up', 90, './img/three-floors-up.jpg', 'Set in an upper-middle-class Tel Aviv apartment building, this best-selling and warmly acclaimed Israeli novel examines the interconnected lives of its residents, whose turmoils, secrets, unreliable confessions, and problematic decisions reveal a society in the midst of an identity crisis.'),
            _createBook('Eshkol Nevo - Homesick', 100, './img/homesick.jpg', 'Moving from character to character, perspective to perspective, Homesick is a complex and moving portrait of parallel lives and failing love in a time of permanent war.')
        ]
    }
    gBooks = books
    _saveBooksToStorage()
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function setNextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0
    }
}