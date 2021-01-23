const logout=document.querySelector("footer");

function handleClick(event){
    localStorage.clear();
}
function init(){
  logout.addEventListener("click",handleClick);
}
init();
