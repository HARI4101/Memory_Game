const allIcons = [
    { name:'bug', icon:'<i class="fa-solid fa-bugs"></i>' },
    { name:'dove', icon:'<i class="fa-solid fa-dove"></i>' },
    { name:'crow', icon:'<i class="fa-solid fa-crow"></i>' },
    { name:'cat', icon:'<i class="fa-solid fa-cat"></i>' },
    { name:'horse', icon:'<i class="fa-solid fa-horse"></i>' },
    { name:'fish', icon:'<i class="fa-solid fa-fish-fins"></i>' },
    { name:'frog', icon:'<i class="fa-solid fa-frog"></i>' },
    { name:'dog', icon:'<i class="fa-solid fa-dog"></i>' },
    { name:'kiwi', icon:'<i class="fa-solid fa-kiwi-bird"></i>' },
    { name:'shrimp', icon:'<i class="fa-solid fa-shrimp"></i>' }
];

const params = new URLSearchParams(window.location.search);
const level = parseInt(params.get("level"));
const mode = params.get("mode");

const gameboard = document.getElementById("gbox");
const levelTitle = document.getElementById("levelTitle");
const timerDisplay = document.getElementById("timerDisplay");
const restartBtn = document.getElementById("restartBtn");

let flipped = [];
let matched = 0;
let cards = [];
let timer;
let timeLeft;

if(level){
    startGame();
}

restartBtn.addEventListener("click", startGame);

function startGame(){
    clearInterval(timer);
    gameboard.innerHTML="";
    flipped=[];
    matched=0;

    levelTitle.innerText=`Level ${level} (${mode})`;

    let pairCount = Math.min(2 + Math.floor(level/2), 10);
    let selected = allIcons.slice(0,pairCount);
    cards=[...selected,...selected];

    shuffle(cards);
    setGrid(cards.length);
    createBoard();
    startTimer();
}

function setGrid(total){
    let cols=Math.ceil(Math.sqrt(total));
    gameboard.style.gridTemplateColumns=`repeat(${cols},1fr)`;
}

function startTimer(){
    if(mode==="easy") timeLeft=60;
    if(mode==="medium") timeLeft=40;
    if(mode==="hard") timeLeft=25;

    timerDisplay.innerText=`Time: ${timeLeft}`;

    timer=setInterval(()=>{
        timeLeft--;
        timerDisplay.innerText=`Time: ${timeLeft}`;

        if(timeLeft<=0){
            clearInterval(timer);
            alert("⏰ Time Up! Restarting...");
            startGame();
        }
    },1000);
}

function createBoard(){
    cards.forEach((item,index)=>{
        const card=document.createElement("div");
        card.classList.add("cardback");
        card.setAttribute("data-id",index);
        card.onclick=flipCard;
        gameboard.appendChild(card);
    });
}

function flipCard(){
    if(flipped.length<2 && this.classList.contains("cardback")){
        let id=this.getAttribute("data-id");
        this.innerHTML=cards[id].icon;
        this.classList.remove("cardback");
        flipped.push(this);

        if(flipped.length===2){
            setTimeout(checkMatch,600);
        }
    }
}

function checkMatch(){
    let id1=flipped[0].getAttribute("data-id");
    let id2=flipped[1].getAttribute("data-id");

    if(cards[id1].name===cards[id2].name && id1!==id2){
        flipped.forEach(c=>c.style.visibility="hidden");
        matched++;

        if(matched===cards.length/2){
            clearInterval(timer);
            alert("🎉 Level Completed!");
        }
    }else{
        flipped.forEach(c=>{
            c.innerHTML="";
            c.classList.add("cardback");
        });
    }
    flipped=[];
}

function goHome(){
    window.location.href="index.html";
}

function shuffle(arr){
    for(let i=arr.length-1;i>0;i--){
        let r=Math.floor(Math.random()*(i+1));
        [arr[i],arr[r]]=[arr[r],arr[i]];
    }
}
