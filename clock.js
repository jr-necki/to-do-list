const clockTitle=document.querySelector(".js-clock"),
clock=clockTitle.querySelector("h1");

function getTime(){
    const now=new Date();
    const hour=now.getHours();
    const min=now.getMinutes();
    const sec=now.getSeconds();

    clock.innerHTML=`${hour}: ${min <10 ? `0${min}`:`${min}`}: ${sec <10 ? `0${sec}`:`${sec}`} `;
}
function init(){
    getTime();
    setInterval(getTime,1000);
  
}
init();