let comment = document.getElementsByClassName('comment')

// EXPANDING REPLIES ON CLICKING REPLIES BUTTON
Array.from(comment).forEach(e => {
    let click = 1
    e.addEventListener('click', () => {
        if (e.nextElementSibling.innerText != 0) {
            if (click == 1) {
                if (e.parentElement.nextElementSibling.nextElementSibling != null) {
                    e.parentElement.nextElementSibling.nextElementSibling.classList.add('repliesTransition')
                    e.classList.add('onClick')
                    click++
                } else {
                    e.parentElement.nextElementSibling.classList.add('repliesTransition')
                    e.classList.add('onClick')
                    click++
                }
            } else {
                if (e.parentElement.nextElementSibling.nextElementSibling != null) {
                    e.parentElement.nextElementSibling.nextElementSibling.classList.remove('repliesTransition')
                    e.classList.remove('onClick')
                    click--
                } else {
                    e.parentElement.nextElementSibling.classList.remove('repliesTransition')
                    e.classList.remove('onClick')
                    click--
                }
            }
        }
    })
});
// INCREASING LIKE COUNT BY 1 ON CLICKING LIKE BUTTON
let like = document.getElementsByClassName('like')
Array.from(like).forEach((btn) => {
    let click = 1
    btn.addEventListener('click', () => {
        if (click == 1) {
            btn.nextElementSibling.innerText = parseInt(btn.nextElementSibling.innerText) + 1
            btn.classList.add('onClick')
            click++
        } else {
            btn.nextElementSibling.innerText = parseInt(btn.nextElementSibling.innerText) - 1
            btn.classList.remove('onClick')
            click--
        }
    })
})

// ANIMATING FORM INPUTS IF EMPTY FORMS ARE BEING SUBMITTING
let addReplyForms = document.querySelectorAll('.addReply')
Array.from(addReplyForms).forEach(form => {
    form.addEventListener('submit', e => {
        if (form.children[2].value == '') {
            form.classList.add('animate')
            form.style.border = '2px solid #b4002b'
            form.children[2].placeholder = 'Reply cannot be empty'
            e.preventDefault()
        }
    })
})

let replyInput = document.querySelectorAll('.replyInput')
Array.from(replyInput).forEach(input => {
    input.addEventListener('focus', e => {
        input.parentElement.classList.remove('animate')
        input.parentElement.style.border = '2px solid transparent'
        input.placeholder = 'Write Your Reply'
    })
})

// CREATING A FUNCTANILITY SO THAT USER CAN EDIT AND UPDATE THEIR REPLY USING REPLY FORM ONLY
let editBtns = document.getElementsByClassName("editBtn")
if (editBtns.length != 0) {
    Array.from(editBtns).forEach(btn => {
        btn.addEventListener('click', () => {
            let removeCSSClasses = false
            let editReplyForm = btn.parentElement.parentElement.parentElement.parentElement.previousElementSibling
            let replyBox = btn.parentElement.parentElement.parentElement.parentElement
            revertBackChanges(replyBox, btn)
            let cancelEditElement = document.createElement('span')
            cancelEditElement.innerText = 'Cancel'
            cancelEditElement.classList.add('cancelBtn')
            cancelEditElement.classList.add('opacityZero')
            let replyText = btn.parentElement.parentElement.childNodes[0].nodeValue
            let replyId = btn.parentElement.firstElementChild.value
            editReplyForm.action = `/question/updatereply/${replyId}`
            editReplyForm.children[2].value = replyText.trim()
            editReplyForm.children[2].placeholder = 'Edit Your Reply'
            editReplyForm.lastElementChild.insertBefore(cancelEditElement, editReplyForm.lastElementChild.firstElementChild)
            setTimeout(() => {
                cancelEditElement.classList.remove('opacityZero')
            }, 50);
            btn.classList.add('classFadeout')
            cancelEditElement.addEventListener('click', () => {
                revertBackChanges(undefined, btn)
            })
        })
    })
}

function revertBackChanges(replyBox, editBtn) {
    if (replyBox != undefined) {
        let allEditBtns = replyBox.getElementsByClassName('editBtn')
        Array.from(allEditBtns).forEach(editBtn => {
            if (editBtn.style.display != 'block') {
                let form = editBtn.parentElement.parentElement.parentElement.parentElement.previousElementSibling
                form.children[2].value = ''
                form.children[2].placeholder = 'Write a Reply'
                form.action = '/question/comment/reply'
                if (form.lastElementChild.firstElementChild.tagName == 'SPAN') {
                    form.lastElementChild.firstElementChild.style.pointerEvents = 'none'
                    form.lastElementChild.firstElementChild.classList.add('opacityZero')
                    setTimeout(() => {
                        form.lastElementChild.firstElementChild.remove()
                    }, 150);
                }
                editBtn.classList.remove('classFadeout')
            }
        })
        return
    }
    let form = editBtn.parentElement.parentElement.parentElement.parentElement.previousElementSibling
    form.action = '/question/comment/reply'
    if (form.lastElementChild.firstElementChild.tagName == 'SPAN') {
        form.lastElementChild.firstElementChild.style.pointerEvents = 'none'
        form.lastElementChild.firstElementChild.classList.add('opacityZero')
        setTimeout(() => {
            form.lastElementChild.firstElementChild.remove()
        }, 150);
    }
    form.children[2].value = ''
    form.children[2].placeholder = 'Write Your Reply'
    editBtn.classList.remove('classFadeout')
}

// CREATING A FUNCTIONALITY TO LET USER EDIT ITS COMMENT USING THE SAME FORM FROM WHERE COMMENT IS POSTED
let editCommentBtn = document.getElementsByClassName('editCommentBtn')
if (editCommentBtn.length != 0) {
    Array.from(editCommentBtn).forEach(btn => {
        btn.addEventListener('click', () => {
            let commentOnQues = document.getElementById('mainQues').innerText.replace(/\?/g, '%3F')
            let commentForm = document.getElementById('askQues')
            undoChanges(undefined, undefined, commentOnQues, commentForm)
            let commentId = btn.parentElement.parentElement.previousElementSibling.value
            let commentValue = btn.parentElement.parentElement.childNodes[0].nodeValue
            commentForm.children[1].value = commentValue.trim()
            commentForm.action = `/question/updatecomment/${commentId}`
            let cancelBtn = document.createElement('span')
            cancelBtn.innerText = 'Cancel Edit'
            cancelBtn.classList.add('cancelEditCommentBtn')
            cancelBtn.classList.add('jusFade')
            commentForm.children[2].insertBefore(cancelBtn, commentForm.children[2].firstElementChild)
            setTimeout(() => {
                cancelBtn.classList.remove('jusFade')
            }, 10);
            btn.classList.add('classFadeout')
            cancelBtn.addEventListener('click', () => {
                undoChanges(btn, cancelBtn, commentOnQues, commentForm)
            })
        })
    })
}

function undoChanges(btn, cancelBtn, commentOnQues, commentForm) {
    if (btn == undefined && cancelBtn == undefined) {
        let allCancelBtns = document.getElementsByClassName('cancelEditCommentBtn')
        if (allCancelBtns.lenght != 0) {
            Array.from(allCancelBtns).forEach(cancelBtn => {
                cancelBtn.remove()
            })
        }
        if (editCommentBtn.length != 0) {
            Array.from(editCommentBtn).forEach(btn => {
                if (btn.classList.contains('classFadeout')) {
                    btn.classList.remove('classFadeout')
                }
            })
        }
        commentForm.action = `/question/${commentOnQues}`
        commentForm.children[1].value = ''
        return
    }
    btn.classList.remove('classFadeout')
    cancelBtn.remove()
    commentForm.children[1].value = ''
    commentForm.action = `/question/${commentOnQues}`
}

let editQuesBtn = document.getElementById('editQues')
if (editQuesBtn != null) {
    editQuesBtn.addEventListener('click', () => {
        let title = editQuesBtn.parentElement.parentElement.parentElement.children[0].innerText
        let description = editQuesBtn.parentElement.parentElement.parentElement.children[1].innerText
        let modalContainer = document.querySelector('.modalContainer')
        modalContainer.firstElementChild.children[2].value = title
        modalContainer.firstElementChild.children[4].value = description
        modalContainer.firstElementChild.action = `/question/updatequestion/${modalContainer.firstElementChild.lastElementChild.value}`
        modalContainer.classList.remove('displayNone')
        setTimeout(() => {
            modalContainer.classList.remove('opacityZero')
        }, 50);
    })
}
let cancelEditQues = document.getElementById('cancelEditQues')
if (cancelEditQues != null) {
    cancelEditQues.addEventListener('click', () => {
        let modalContainer = document.querySelector('.modalContainer')
        modalContainer.firstElementChild.children[2].value = ''
        modalContainer.firstElementChild.children[4].value = ''
        modalContainer.firstElementChild.removeAttribute("action")
        modalContainer.classList.add('opacityZero')
        setTimeout(() => {
            modalContainer.classList.add('displayNone')
        }, 200);
    })
}
// OPENING MODAL ON CLICKING EDIT QUESTION BUTTON
let modalContainer = document.querySelector('.modalContainer')
let modalForm;
if (modalContainer != null) {
    modalForm = modalContainer.firstElementChild
    modalContainer.addEventListener('submit', (e) => {
        if (modalContainer.firstElementChild.children[2].value == '' && modalContainer.firstElementChild.children[4].value == '') {
            modalContainer.firstElementChild.children[2].classList.add('animate')
            modalContainer.firstElementChild.children[2].style.border = '2px solid #b4002b'
            modalContainer.firstElementChild.children[4].classList.add('animate')
            modalContainer.firstElementChild.children[4].style.border = '2px solid #b4002b'
            e.preventDefault()
        } else if (modalContainer.firstElementChild.children[2].value == '') {
            modalContainer.firstElementChild.children[2].classList.add('animate')
            modalContainer.firstElementChild.children[2].style.border = '2px solid #b4002b'
            e.preventDefault()
        } else if (modalContainer.firstElementChild.children[4].value == '') {
            modalContainer.firstElementChild.children[4].classList.add('animate')
            modalContainer.firstElementChild.children[4].style.border = '2px solid #b4002b'
            e.preventDefault()
        }
    })
}
let quesEditElement = document.getElementsByClassName('quesEditElement')
if (quesEditElement.length != 0) {
    Array.from(quesEditElement).forEach(element => {
        element.addEventListener('focus', () => {
            element.classList.remove('animate')
            element.style.border = '2px solid transparent'
        })
    })
}
let newCommentForm = document.getElementById('askQues')

if (newCommentForm != null) {
    newCommentForm.addEventListener('submit', e => {
        if (newCommentForm.children[1].value == '') {
            newCommentForm.children[1].classList.add('animate');
            newCommentForm.children[1].style.border = '2px solid #b4002b';
            e.preventDefault()
        }
    })
    if (newCommentForm.children[1] != null) {
        newCommentForm.children[1].addEventListener('focus', () => {
            newCommentForm.children[1].classList.remove('animate')
            newCommentForm.children[1].style.border = '2px solid transparent'
        })
    }

}
let navLinksSection = document.querySelector('.nav-links')
let menuIcon = document.querySelector('.menuIcon')
let crossIcon = document.querySelector('.cross')
let linkSection = document.querySelector('.crossNdLinks')

menuIcon.addEventListener('click', () => {
    document.querySelector('body').style.overflow = 'hidden'
    setTimeout(() => {
        navLinksSection.style.backgroundColor = 'rgba(0, 0, 0, 0.37)'
    }, 100)
    navLinksSection.style.transform = 'translateX(0px)'
})
crossIcon.addEventListener('click', () => {
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

