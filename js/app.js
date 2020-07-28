//constructor function
function BookMark(name, url){
    this.siteName = name,
    this.siteUrl = url
}


//functions to interact with UI and Validate The input
class UI{
    static display(){
        const bookMarks = store.getBookMarks();

        bookMarks.forEach(bookMark => {
            UI.addToList(bookMark)
            
        });
    }

    static addToList(bookMark){
        const row = document.createElement('li');

        row.innerHTML = `
                        <span>${bookMark.siteName}</span>
                        <a href="${bookMark.siteUrl}" target="_blank">Visit</a>
                        <button class="delete" >Delete</button>` ;
        row.classList.add('items');
        document.querySelector('#list').appendChild(row);
    }

    static validate(siteName, siteUrl){
        const valid = /^(ftp|http|https):\/\/[^ "]+$/ ;

        if(siteName === '' || siteUrl === ''){
            alert('Enter the requird field');
        } else if(valid.test(siteUrl)) {
            const bookMark = new BookMark(siteName, siteUrl);
            UI.addToList(bookMark);
            store.addToStorage(bookMark);
                UI.clearInputField();
        } else {
            alert('Please enter valid Url')
        }
    }

    static removeFromList(el){
        el.remove();
    }

    static clearInputField(){
        document.querySelector('#input-name').value  = '';
        document.querySelector('#input-url').value = '';
    }
}

//functions to interact with local Storage
class store{
static getBookMarks(){
    let bookMarks
    if(localStorage.getItem('bookMarks') === null){
        return bookMarks = [];
    } else {
        bookMarks = JSON.parse(localStorage.getItem('bookMarks'));
        return bookMarks
    }
}

    static addToStorage(bookMark){

        const bookMarks = store.getBookMarks();
        bookMarks.push(bookMark);
        localStorage.setItem('bookMarks', JSON.stringify(bookMarks));
    }

    static removeFromStorage(el){
        const bookMarks = store.getBookMarks();

        bookMarks.forEach((bookMark, index) => {
            if(bookMark.siteName.toLowerCase() === el){
                bookMarks.splice(index, 1);
            } 
        });
        localStorage.setItem('bookMarks', JSON.stringify(bookMarks));
    }
}



//Event Listener
document.addEventListener('DOMContentLoaded', UI.display());

document.querySelector('#form-input').addEventListener('submit',(e) => {
    e.preventDefault();
    const siteName = document.querySelector('#input-name').value;
    const siteUrl = document.querySelector('#input-url').value;
    UI.validate(siteName, siteUrl);
});

document.querySelector('#list').addEventListener('click',(e) => {  
    if(e.target.classList.contains('delete')){
        UI.removeFromList(e.target.parentElement);
        store.removeFromStorage(e.target.previousElementSibling.previousElementSibling.textContent.toLowerCase());
    
    }
});













