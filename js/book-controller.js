'use strict'

var gIsDesc = 1
// var gSelectedBookIdForRead
var gSelectedBookIdForUpdate
var gLastSort

function onInit() {
    renderBooks()
}

function onNextPage() {
    setNextPage()
    renderBooks()
}

function onSetSortBy(sortBy) {

    if (gLastSort === sortBy) {
        gIsDesc = (gIsDesc * -1)
        // if (gIsDesc === -1) {
        //     gIsDesc = 1
        // } else {
        //     gIsDesc = -1
        // }
        setBookSort(sortBy, gIsDesc)
    } else {
        gIsDesc = 1
        setBookSort(sortBy, gIsDesc)
    }
    gLastSort = sortBy
}

function renderBooks() {
    var books = getBooks()
    var strHtml = books.map(book => {
        return `
<tr>
    <td>${book.id}</td>
    <td>${book.title}</td>
    <td>${book.price}</td>
    <td><button class="read-button" onclick="onReadBook(${book.id})">Read</button></td>
    <td><button class="update-button" onclick="onUpdateBook(${book.id})">Update</button></td>
    <td><button class="delete-button" onclick="onRemoveBook(${book.id})">Delete</button></td>
</tr>`
    })
    document.querySelector('.books-table tbody').innerHTML = strHtml.join('')
}

function onAddBook() {
    var elBookName = document.querySelector('input[name=book-name]')
    var newBookName = elBookName.value
    elBookName.value = ''

    var elBookPrice = document.querySelector('input[name=book-price]')
    var newBookPrice = +elBookPrice.value
    console.log(elBookPrice.value);
    elBookPrice.value = ''

    if (newBookName && newBookPrice) {
        const book = addBook(newBookName, newBookPrice)
        renderBooks()
        document.querySelector('.eror-input').innerText = ''
        flashMsg(`Book Added (id: ${book.id})`)
    } else {
        document.querySelector('.eror-input').innerText = 'You must insert book title and price'
    }

}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
    flashMsg(`book Deleted`)
}

function onRateBook(event) {
    updateBookRate(+event.target.id, +event.target.value)
    renderBooks()
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.read-modal')
    elModal.querySelector('h3').innerText = book.title
    elModal.querySelector('p').innerText = book.description
    elModal.querySelector('img').src = book.imgUrl
    elModal.classList.add('open')
    elModal.querySelector('.input-rate').value = book.rate
    elModal.querySelector('.input-rate').id = book.id
    // gSelectedBookIdForRead = bookId
}

function onUpdateBook(bookId) {
    gSelectedBookIdForUpdate = bookId
    var elModal = document.querySelector('.update-price-modal')
    elModal.classList.add('open')
}

function flashMsg(msg) {
    const elMsg = document.querySelector('.user-msg')
    elMsg.innerText = msg
    elMsg.classList.add('open')
    setTimeout(() => {
        elMsg.classList.remove('open')
    }, 3000)
}

function onCloseModal() {
    document.querySelector('.read-modal').classList.remove('open')
    // gSelectedBookIdForRead = null
}

function onCloseUpdatePriceModal() {

    var newPrice = document.querySelector('input[name=update-price]').value
    if (newPrice < 0) {
        return
    }
    else {
        const book = updateBook(gSelectedBookIdForUpdate, newPrice)
        renderBooks()
        flashMsg(`Price updated to: ${book.price}`)
    }

    document.querySelector('.update-price-modal').classList.remove('open')
    gSelectedBookIdForUpdate = null
}