const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

let isClicked=false;

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}
function handlemouseover(event){
  this.innerText="❌";
}
function handlemouseout(event){
  this.innerText="✖";
}
function checkToDo(event){
  this.innerText="✅";
  isClicked=true;
}
function handlemouseoverCheck(event){
   
}
function handlemouseoutCheck(event){

}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  checkBtn.innerText = "✔";
  checkBtn.style.border="none";
  checkBtn.style.backgroundColor="rgba(0,0,0,0)";

  delBtn.innerText = "✖";
  delBtn.style.border="none";
  delBtn.style.backgroundColor="rgba(0,0,0,0)";

  
  delBtn.addEventListener("click", deleteToDo);
  delBtn.addEventListener("mouseover",handlemouseover);
  delBtn.addEventListener("mouseout",handlemouseout);

  checkBtn.addEventListener("click", checkToDo);
  checkBtn.addEventListener("mouseover",handlemouseoverCheck);
  checkBtn.addEventListener("mouseout",handlemouseoutCheck);

  span.style.margin="5px";
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(checkBtn);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  toDoList.style.backgroundColor="yellow";
  
  li.style.color="black";
  toDoForm.style.margin="50px";
  
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();