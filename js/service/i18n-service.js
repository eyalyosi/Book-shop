var gTrans = {
    'title': {
        en: 'Welcome to the book shop',
        he: 'ברוך הבא לחנות הספרים'
    },
    'Enter-book-name-placeholder': {
        en: 'Enter book name',
        he: 'הכנס את שם הספר',
    },
    'Enter-book-price-placeholder': {
        en: 'Enter book price',
        he: 'הכנס מחיר ספר',
    },
    'create-new-book-button': {
        en: 'create new book',
        he: 'צור ספר חדש'
    },
    'next-page': {
        en: 'next page',
        he: 'דף הבא',
    },
    'book-title': {
        en: 'Book title',
        he: 'שם הספר',
    },
    'book-price': {
        en: 'price',
        he: 'מחיר',
    },
    'book-price-currency': {
        en: '$',
        he: '₪',
    },
    'book-summary': {
        en: 'book-summary',
        he: 'תקציר הספר',
    },
    'rate-price-p': {
        en: 'rate',
        he: 'דרג'
    },
    'price-question': {
        en: 'What is the new price?',
        he: 'מה המחיר החדש?'
    },
    'close-update-price-button': {
        en: 'Close',
        he: 'סגור'
    },
    'action-read-button': {
        en: 'Read',
        he: 'קרא'
    },
    'action-update-button': {
        en: 'Update',
        he: 'עדכן'
    },
    'action-delete-button': {
        en: 'Delete',
        he: 'מחק'
    },
    'action-buttons': {
        en: 'Action',
        he: 'פעולה'
    },
    'Enter-new-price-placeholder': {
        en: 'Enter new price',
        he: 'הכנס מחיר חדש'
    },
    'book-id': {
        en: 'ID',
        he: 'מס"ד'
    },
    'no-input-message': {
        en: 'You must insert book title and price',
        he: 'חובה להכניס שם ספר ומחיר'
    },
    'flash-msg-update': {
        en: 'Price update to:',
        he: 'מחיר הספר התעדכן ל:'
    },
    'flash-msg-delete': {
        en: 'Book deleted',
        he: 'הספר נמחק'
    },
}

var gCurrLang = 'en';


function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'

    var txt = keyTrans[gCurrLang]
    if (!txt) txt = keyTrans.en

    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach((el) => {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)
        if (el.nodeName === 'INPUT') {
            // el.setAttribute('placeholder', txt)
            //THE SAME!
            el.placeholder = txt
        } else el.innerText = txt
    })
}

function setLang(lang) {
    gCurrLang = lang;
    doTrans()
}



