// ***CSWall***
// (low priority) When the page loads on mobile, scroll to the section holding the add to wall.
// Use local storage to store their names, emails ,font and position as objects. If a user uses a particular image twice,
// it cannot allow such.
// The program selects a random position where the name stays or the user chooses exactly where their name appears.
const button = document.querySelector(".button button");
const popup = document.querySelector(".form-popup");
const popupForm = document.querySelector(".form-popup form");
const grids = document.querySelectorAll(".names .grid");
const info = document.querySelector(".info-popup");
const infoDiv = document.querySelector(".info-popup .info");
const cancel = document.querySelector(".cancel-popup");
const cancelDiv = document.querySelector(".cancel-popup .c-info");
const cTag = document.querySelector(".c-info p");
const localError = document.querySelector('.local-error');
// form shit
const nameForm = document.querySelector(".nameForm");
const nickname = document.querySelector("#name");
const selectFont = document.querySelector("#font");
const link = document.querySelector("#link");
const errors = document.querySelectorAll(".sub .error");
const nameError = document.querySelector(".sub .name-error");
const linkError = document.querySelector(".sub .link-error");
const fontError = document.querySelector(".sub .font-error");
const theGrid = document.querySelector('#hiddengrid');

// fontSwitcher('Lobster#G', '.grid');
grids.forEach((grid, index) => {
  grid.onclick = () => {
    if (grid.innerHTML === "") {
      popup.style.visibility = "visible";
      popupForm.style.transform = "scale(1)";
      go(grid, index);
    } else {
      const local = localStorage.getItem('user');
      obj = JSON.parse(local);
      url = `/one/${index}`;
      fetch(url)
        .then(response => response.json())
        .then(one =>{
          cTag.innerHTML = `This space have been used already by 
          <a href='${one[0].fields.link}' target='_blank'>${one[0].fields.username}</a>`;
        })
        .catch(err => console.log(err))

      cancel.style.visibility = "visible";
      cancelDiv.style.transform = "scale(1)";
    }
  };
});

button.onclick = () => {
  popup.style.visibility = "visible";
  popupForm.style.transform = "scale(1)";
  buttonGo();
};

// off js
function off() {
  popupForm.style.transform = "scale(0.1)";
  popup.style.visibility = "hidden";
  localError.style.visibility = 'hidden';
  nickname.value = "";
  link.value = "";
}
function iOff() {
  infoDiv.style.transform = "scale(0.1)";
  info.style.visibility = "hidden";
}
function cOff() {
  cancelDiv.style.transform = "scale(0.1)";
  cancel.style.visibility = "hidden";
}

let fontsArray = [
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui",
  "Times New Roman",
  "Courier New",
  "Lucida Sans",
  "Almendra SC,serif",
  "Amatic SC,cursive",
  "Arbutus,cursive",
  "Bangers,cursive",
  "Caesar Dressing,cursive",
  "Comforter Brush,cursive",
  "Cormorant SC,serif",
  "DynaPuff,cursive",
  "Exo,sans-serif",
  "Hanalei Fill,cursive",
  "Josefin Sans,sans-serif",
  "Lato,sans-serif",
  "Limelight,cursive",
  "Marvel,sans-serif",
  "Open Sans,sans-serif",
  "Podkova,serif",
  "Poppins,sans-serif",
  "Rubik Moonrocks,cursive",
  "Shadows Into Light,cursive",
  "Share,cursive",
  "Yanone Kaffeesatz,sans-serif",
];
document.addEventListener("DOMContentLoaded", function () {
  infoDiv.style.transform = "scale(1)";
  info.style.visibility = "visible";
  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute(
    "href",
    "https://fonts.googleapis.com/css2?family=Almendra+SC&family=Amatic+SC:wght@700&family=Arbutus&family=Bangers&family=Caesar+Dressing&family=Comforter+Brush&family=Cormorant+SC:wght@500;600&family=DynaPuff:wght@600&family=Exo:wght@600&family=Hanalei+Fill&family=Josefin+Sans:wght@400;500&family=Lato:wght@700&family=Limelight&family=Marvel:wght@700&family=Open+Sans:wght@500;600&family=Podkova:wght@600&family=Poppins:wght@600&family=Rubik+Moonrocks&family=Shadows+Into+Light&family=Share:wght@700&family=Yanone+Kaffeesatz:wght@600&display=swap"
  );
  document.head.appendChild(link);

  fontsArray.forEach((ele)=>{
    const option = document.createElement('option');
    option.value = ele;
    if(ele == "monospace"){
      option.selected = 'selected';
    }
    const optVal = ele.split(',');
    option.style.fontFamily = ele;
    option.innerHTML = optVal[0];
    selectFont.appendChild(option);
  })
  let font = selectFont.options[selectFont.selectedIndex].value;
});

function wallNames(){
  const url = '/all_json';
  fetch(url)
    .then(response => response.json())
    .then(names => {
      names.forEach((nm)=>{
        grids.forEach((grid,index)=>{
          if(index == nm.fields.grid){
            grid.innerHTML = `<p style="font-family:${nm.fields.font}">${nm.fields.username}</p>`
          }
        })
      })
    })
    .catch(err => console.log(err))
}
wallNames();
// form js
nickname.onkeyup = () => {
  nameError.style.visibility = "hidden";
};
link.onkeyup = () => {
  linkError.style.visibility = "hidden";
};
let trueFont = check(font);
selectFont.onchange = () => {
    font = selectFont.options[selectFont.selectedIndex].value;
    trueFont = check(font);
  linkError.style.visibility = "hidden";
  fontError.style.visibility = "hidden";
  if (trueFont) {
    nickname.style.fontFamily = font;
  } else {
    fontError.innerHTML = "invalid font";
    fontError.style.visibility = "visible";
  }
};
function check(val) {
  return fontsArray.includes(val);
}

function go(container, index) {
  nameForm.addEventListener("submit", (e) => {
    if(localStorage.getItem('data') !== null){
        if(localStorage.getItem('user') === null){
          if (nickname.value == "" && font == "" && link.value == "") {
            fontError.innerHTML = "font cannot be empty";
            nameError.innerHTML = "Name cannot be empty";
            errors.forEach((them) => {
              them.style.visibility = "visible";
            });
            e.preventDefault();
          }
          if (nickname.value == "" && link.value == "") {
            nameError.innerHTML = "Name cannot be empty";
            nameError.style.visibility = "visible";
            linkError.style.visibility = "visible";
            e.preventDefault();
          }
          if (nickname.value == "") {
            nameError.innerHTML = "Name cannot be empty";
            nameError.style.visibility = "visible";
            e.preventDefault();
          }
          if (nickname.value.length > 15) {
            nameError.innerHTML = "Name is too long blud";
            nameError.style.visibility = "visible";
            e.preventDefault();
          }
          if (link.value == "") {
            linkError.style.visibility = "visible";
            e.preventDefault();
          }
          if (font == "") {
            fontError.innerHTML = "font cannot be empty";
            fontError.style.visibility = "visible";
            e.preventDefault();
          }
          if (!trueFont) {
            fontError.innerHTML = "invalid font";
            fontError.style.visibility = "visible";
            e.preventDefault();
          }
          if (
            nickname.value.length <= 15 &&
            nickname.value.length > 0 &&
            trueFont &&
            link.value.length > 0
          ) {
            theGrid.value = index;
            const userObj = {
              grid: index,
              userName: nickname.value,
              fontType: font,
              userLink: link.value,
            };
            localStorage.setItem('user', JSON.stringify(userObj));
            nickname.value = document.querySelector("#name").value;
            userLink.value = document.querySelector("#link").value;
            off();
          }else{
            e.preventDefault();
          }
        }else{
          localError.innerHTML= 'Your Name is on CSWall already!';
          localError.style.visibility = 'visible';
          e.preventDefault();
        }
    }else{
        localError.innerHTML=`Be an <a href="/index">ALUMNI</a> First!`;
          localError.style.visibility = 'visible';
          e.preventDefault();
    }
  });
  
}

function buttonGo() {
  let gridMap = [];
  grids.forEach(function (ele, index) {
    if (ele.innerHTML == "") {
      gridMap.push({
        id: index,
        grid: ele,
      });
    }
  });
  const chosen = gridMap[Math.floor(Math.random() * gridMap.length)];
  go(chosen.grid, chosen.id);
}

// AIzaSyCAuL_KcOhfqWSrDYAugVMzxoUDLxM6Nic
