let elForm = document.querySelector('.form')
let elInput = document.querySelector('.input')
let elTemplate = document.querySelector('#template').content
let elList = document.querySelector('.list')
let elSpan = document.querySelector('.span')

let storage = window.localStorage
let localTodo = JSON.parse(storage.getItem('todoArray'))
let localCounter = JSON.parse(storage.getItem('counter'))

let todoListArray = localTodo || []
let counter = localCounter || 1

function updateTodo() {
    storage.setItem('todoArray', JSON.stringify(todoListArray))
    renderTodo(todoListArray, elList)
}

elForm.addEventListener('submit', function(evt){
    evt.preventDefault()

    let inputValue = elInput.value.trim()

    if (inputValue) {
        let todoObj = {
            id : ++counter,
            todo : inputValue,
            isComplated : false
        }
        storage.setItem('counter', JSON.stringify(counter))

         todoListArray.unshift(todoObj)
        elInput.value = null
        updateTodo()
    }
})

function renderTodo(todo, wrapper) {
    wrapper.innerHTML = null

    let elFragment = document.createDocumentFragment()

    todo.forEach(item => {
        
        let template = elTemplate.cloneNode(true)

        template.querySelector('.titlee').textContent = item.todo;
        template.querySelector('.del').dataset.todoBtnId = item.id;

        elFragment.appendChild(template)
    });
    wrapper.appendChild(elFragment)
    elSpan.textContent = todoListArray.length
}
renderTodo(todoListArray, elList)


elList.addEventListener('click', function(evt){

    let delBtnId = evt.target.dataset.todoBtnId
    
    if (delBtnId) {
        let spliceTodos = todoListArray.findIndex(item => item.id == delBtnId)
        
        todoListArray.splice(spliceTodos, 1)
        updateTodo()
    }
})

