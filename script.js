const addItem = document.querySelector('.add-items')
const itemList = document.querySelector('.plates')

const getLocalStorage = () => JSON.parse(localStorage.getItem('list_items')) ?? []
const setLocalStorage = (listItems) => localStorage.setItem('list_items', JSON.stringify(listItems))

const items = getLocalStorage()

function addItemFunc(e){
  e.preventDefault()
  const text = (this.querySelector('[name=item]')).value
  const item = {
    text,
    done: false
  }
  items.push(item)
  populateList(items, itemList)
  setLocalStorage(items)
  document.querySelector('form').reset() //reseta ou limpa o form
 }
 //Cria o html li com os atributos necessários
 function populateList(plates = [], platesList){
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/>
        <label for="item${i}">${plate.text}</label>
      </li>
    `
  }).join('')
 }

 function toggleDone(e){
  const el = e.target
  if (!el.matches('input')) return //se o click nao em um input, codigo para
  const index = el.dataset.index //pega o index do elemento clicado data-index
  items[index].done = !items[index].done //se a prop done do obj item clicado for true vira false e vice versa
  setLocalStorage(items) //envia a informação pro localStorage
  populateList(items, itemList) // atualiza a lista
 }

addItem.addEventListener('submit', addItemFunc)

populateList(items, itemList)

itemList.addEventListener('click', toggleDone)

/*
Desafio cria novos botões (checkall, uncheck all e delete all)
*/

const deleteBtn = document.querySelector('#deleteAll')

const deleteAllItems = () => {
  if (items.length > 0) {
    items.splice(0, items.length)
    setLocalStorage(items)
    populateList(items, itemList)
  }
}

deleteBtn.addEventListener('click', deleteAllItems)

const checkAll = document.querySelector('#markAll')
checkAll.addEventListener('click', () => {
  items.forEach(checkbox => {
    if (checkbox.done === false) {
      checkbox.done = true
    }
    setLocalStorage(items)
    populateList(items, itemList)
  });
})

const uncheckAll = document.querySelector('#unmarkAll')
uncheckAll.addEventListener('click', () => {
  items.forEach(checkbox => {
    if (checkbox.done === true) {
      checkbox.done = false
    }
    setLocalStorage(items)
    populateList(items, itemList)
  });
})