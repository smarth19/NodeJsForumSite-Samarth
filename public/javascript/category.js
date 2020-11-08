let form = document.getElementById('askQues')
let input, textarea;

if (form != null) {
    input = form.querySelector('input')
    textarea = form.querySelector('textarea')
    form.addEventListener('submit', (e) => {
        if (input.value == '' && textarea.value == '') {
            input.classList.add('animate')
            input.style.border = '2px solid #b4002b'
            textarea.classList.add('animate')
            textarea.style.border = '2px solid #b4002b'
            textarea.nextElementSibling.style.visibility = 'visible'
            e.preventDefault()
        } else if (input.value == '' || input.value.length < 20 || input.value.length > 200) {
            input.classList.add('animate')
            input.style.border = '2px solid #b4002b'
            e.preventDefault()
        } else if (textarea.value == '') {
            textarea.classList.add('animate')
            textarea.style.border = '2px solid #b4002b'
            e.preventDefault()
        }
    })
    
}

if(input != undefined && textarea != undefined){
    [input, textarea].forEach((e) => {
        e.addEventListener('focus', () => {
            e.classList.remove('animate')
            e.style.border = '2px solid transparent'
            if(e.className == 'desc'){
            e.nextElementSibling.style.visibility = 'hidden'
            }
        })
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
let toggleAccountName = document.querySelector('.accountNameToggle')
let userName = document.querySelector('#userName')

if (toggleAccountName != null) {
    toggleAccountName.addEventListener('click', () => {
        toggleAccountName.firstElementChild.classList.toggle('rotateAccountNameToggle')
        userName.classList.toggle('userToggle')
    })
}
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