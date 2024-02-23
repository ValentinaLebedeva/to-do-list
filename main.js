const form = document.querySelector("#addForm");
const itemsList = document.querySelector("#items");
const search = document.querySelector("#search");
let checkboxes = document.querySelectorAll(".list__group input[type='checkbox']");
let lastChecked;

// Additing a new item
form.addEventListener("submit", addItem);

// function for additing a new item
function addItem(event) {
  event.preventDefault();

  //getting text from input form 
  let newItemInput = document.querySelector("#newItemText");
  let newItemText = newItemInput.value;

  // creating element for a new item 
  let newElement = document.createElement("li");
  newElement.className = "list__item";


  // creating input wrapper
  let newWrapper = document.createElement("div");
  newWrapper.className = "input__item";

  newElement.appendChild(newWrapper);

  // creating input 
  let newInput = document.createElement("input");
  newInput.setAttribute("type", "checkbox");

  // additing input in wrapper
  newWrapper.appendChild(newInput);

  // creating text element
  let newText = document.createElement("p");
  newWrapper.appendChild(newText);

  // additing text to a new item
  let newTextNode = document.createTextNode(newItemText);
  newText.appendChild(newTextNode);

  // creating "delete" button
  let deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  deleteBtn.className = "list__btn";
  deleteBtn.dataset.action = "delete";
  newElement.appendChild(deleteBtn);

  // additing a new item to the list
  itemsList.prepend(newElement);

  // clearing input for the next item 
  newItemInput.value = "";
}

// deleting an item from the list 
itemsList.addEventListener("click", removeItem);

function removeItem(event) {
  if (event.target.getAttribute("data-action") == "delete") {
    if (confirm("Delete duty?")) {
      event.target.parentNode.remove();
    }
  }
}

//filter of the list
search.addEventListener("keyup", searchItems);

function searchItems(event) {
  let searchedText = event.target.value.toLowerCase();

  // Getting all items from the list
  let items = itemsList.querySelectorAll("li");

  items.forEach(function (item) {
    let itemText = item.firstElementChild.textContent.toLowerCase();
    // checking seaching input in the list

    if (itemText.indexOf(searchedText) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

/* changing style of the page */

const btnStyle = document.querySelector(".different-look-btn");
const backgrounds = ["bird", "blur", "lights", "rain"];
let index = 1;
btnStyle.addEventListener("click", changeStyle);

function changeStyle() {
  setStyle();
  if (index >= (backgrounds.length - 1)) {
    index = 0;
  } else {
    index++;
  }
  return index;
}

function setStyle() {
  const mainBackground = document.querySelector(".background");
  const wrapper = document.querySelector(".wrapper");
  const addBtn = document.querySelector(".btn");
  const headerTitle = document.querySelector(".header__title");
  const listTitle = document.querySelector(".list__title");

  mainBackground.style.background = `url("${backgrounds[index]}.jpg") center no-repeat`;
  mainBackground.style.backgroundSize = 'cover';

  btnStyle.style.backgroundColor = `var(--${backgrounds[index]})`;
  addBtn.style.backgroundColor = `var(--${backgrounds[index]})`;

  wrapper.style.fontFamily = `var(--font-${backgrounds[index]})`;
  btnStyle.style.fontFamily = `var(--font-${backgrounds[index]})`;
  addBtn.style.fontFamily = `var(--font-${backgrounds[index]})`;

  headerTitle.style.color = `var(--title-${backgrounds[index]})`;
  listTitle.style.color = `var(--title-${backgrounds[index]})`;
}

/* checking several checkbox by pressing "shift" */

function handleCheck(e) {
  //check if the shift key was down and checking in
  let inBentween = false;
  //if new checkboxes were added
  checkboxes = document.querySelectorAll(".list__group input[type='checkbox']");

  if (e.shiftKey && this.checked) {
    //loop pver checkbox
    checkboxes.forEach(checkbox => {
      if (checkbox === this || checkbox === lastChecked) {
        inBentween = !inBentween;
      }
      if (inBentween) {
        checkbox.checked = true;
      }
    })
  }
  lastChecked = this;
  // using function if new checkboxes were added
  checkboxes.forEach(checkbox => checkbox.addEventListener("click", handleCheck));
}

checkboxes.forEach(checkbox => checkbox.addEventListener("click", handleCheck));