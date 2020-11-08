let form = document.querySelector('form[action="/user/login"]')
let inputs = form.querySelectorAll('input')
let email, password;
[email, password] = Array.from(inputs)
form.addEventListener('submit', (e) => {
    if (email.value == '' || password.value == '') {
        email.classList.add('animate')
        password.classList.add('animate')
        email.style.border = '2px solid #b4002b'
        password.style.border = '2px solid #b4002b'
        e.preventDefault()
    }
})
Array.from(inputs).forEach((input) => {
    input.addEventListener('focus', () => {
        input.style.border = '2px solid transparent'
        input.classList.remove('animate')
    })
})

let msg = document.querySelector('.alert>i')
if (msg != null) {
    msg.addEventListener('click', () => {
        msg.parentElement.style.opacity = 0
        msg.parentElement.style.visibility = 'hidden'
    })
}
let navLinksSection = document.querySelector('.nav-links')
let menuIcon = document.querySelector('.menuIcon')
let crossIcon = document.querySelector('.cross')

menuIcon.addEventListener('click', ()=>{
    document.querySelector('body').style.overflow = 'hidden'
    setTimeout(()=>{
        navLinksSection.style.backgroundColor = 'rgba(0, 0, 0, 0.37)'
    }, 100)
    navLinksSection.style.transform = 'translateX(0px)'
})
crossIcon.addEventListener('click', ()=>{
    document.querySelector('body').style.overflow = 'auto'
    navLinksSection.style.backgroundColor = 'transparent'
    setTimeout(() => {
        navLinksSection.style.transform = 'translateX(1000px)'
    }, 100);    
})
let toggleSearchBtn = document.querySelector('.toggleSearchBtn')
let searchBarContainer = document.querySelector('.searchBarContainer')

toggleSearchBtn.addEventListener('click', ()=>{
    toggleSearchBtn.firstElementChild.classList.toggle('rotateSearchBarToggle')
    searchBarContainer.classList.toggle('searchBarToggle')
})
let searchForm = document.getElementById('searchForm')
searchForm.addEventListener('submit', e=>{
    if (searchForm.firstElementChild.value == '') {
        searchForm.classList.add('animate')
        searchForm.style.border = '2px solid #b4002b'
        e.preventDefault()
    }
})
searchForm.firstElementChild.addEventListener('focus', ()=>{
        searchForm.style.border = '2px solid transparent'
        searchForm.classList.remove('animate')
})