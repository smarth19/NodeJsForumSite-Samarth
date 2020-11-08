let signupForm = document.querySelector('#signupForm')
let inputs = signupForm.querySelectorAll('input')
let name, email, password, cpassword;
[name, email, password, cpassword] = Array.from(inputs)
let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

signupForm.addEventListener('submit', (e) => {
    if (name.value == '' && email.value == '' && password.value == '' && cpassword.value == '') {
        Array.from(inputs).forEach((input) => {
            input.style.border = '2px solid #b4002b'
            input.nextElementSibling.style.display = 'block'
            input.classList.add('animate')
        })
        e.preventDefault()
    }
    if (password.value == '' || password.value.length < 6) {
        password.style.border = '2px solid #b4002b'
        password.nextElementSibling.style.visibility = 'visible'
        password.classList.add('animate')
        e.preventDefault()
    }
    if (cpassword.value == '') {
        cpassword.nextElementSibling.style.visibility = 'visible'
        cpassword.style.border = '2px solid #b4002b'
        cpassword.classList.add('animate')
        e.preventDefault()
    }
    if (name.value == '') {
        name.nextElementSibling.style.visibility = 'visible'
        name.style.border = '2px solid #b4002b'
        name.classList.add('animate')
        e.preventDefault()
    }
    if (!regex.test(email.value)) {
        email.nextElementSibling.style.visibility = 'visible'
        email.style.border = '2px solid #b4002b'
        email.classList.add('animate')
        e.preventDefault()
    }
    if (password.value != cpassword.value) {
        cpassword.nextElementSibling.nextElementSibling.style.visibility = 'visible'
        cpassword.style.border = '2px solid #b4002b'
        cpassword.classList.add('animate')
        e.preventDefault()
    }
})

Array.from(inputs).forEach((input) => {
    input.addEventListener('focus', () => {
        removeCssClass(input)
    })
})
function removeCssClass(input) {
    input.style.border = '2px solid transparent'
    input.classList.remove('animate')
    input.nextElementSibling.style.visibility = 'hidden'
    if (input.nextElementSibling.nextElementSibling != null && input.nextElementSibling.nextElementSibling.id == 'passNotMatch') {
        input.nextElementSibling.nextElementSibling.style.visibility = 'hidden'
    }
}

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