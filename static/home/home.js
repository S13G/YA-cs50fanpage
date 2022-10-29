const form = document.querySelector('.form form');
// const audio = document.querySelector('#themesong');
// audio.volume = 0;
let volumeShown = true;
window.addEventListener("DOMContentLoaded", event => {
  const volume = document.querySelector('.volume');
  const play = document.querySelector('.volume i');
  const audio = document.querySelector("audio");
  if(sessionStorage.getItem('visited') === null){
    // when the user permits the play. we play the sound
    play.onclick = ()=>{
      play.classList.remove('fa-play');
      play.classList.add('fa-pause');
      audio.volume = 0.2;
      audio.play();
      volume.classList.remove('view');
    }
    volume.classList.add('view');
    sessionStorage.setItem('visited',true);
  }
});

function clearVolume(){
  const volume = document.querySelector('.volume');
  volume.classList.remove('view');
  volumeShown = false;
}

document.addEventListener("DOMContentLoaded", function () {
  const word = document.querySelector(".word span p");
  const paused = document.querySelectorAll(".paused");
  const rocket = document.querySelector(".rocket");
  const imageDivs = document.querySelectorAll(".img div");
  const buttons = document.querySelectorAll('.alumni button');
  const blur = document.querySelector('.form');
  const offs = document.querySelectorAll('body .off');
  const alumna = document.querySelector('form #alumna');
  const alumnus = document.querySelector('form #alumnus');
  const errors = document.querySelectorAll('.form .error');
  const email = document.querySelector('#email');
  const note = document.querySelector('#note');
  const noteError = document.querySelector('.note .error');
  const emailError = document.querySelector('.email .error');
  const localError = document.querySelector('.django-error');

  let shown = false;
  buttons.forEach((button)=>{
    button.onclick =()=>{
        blur.classList.toggle('view');
        if(!shown){
            form.style.transform = "scale(1)";
            if(button.value === "alumnus"){
              alumna.style.display = "none";
              alumnus.style.display = "block";
              if(sessionStorage.getItem('gender') === null || sessionStorage.getItem('gender') == 'f'){
                sessionStorage.setItem('gender','m');
              }
            }
            if(button.value === 'alumna'){
              alumnus.style.display = "none";
              alumna.style.display = 'block';
              if(sessionStorage.getItem('gender') === null || sessionStorage.getItem('gender') == 'm'){
                sessionStorage.setItem('gender','f');
              }
            }
            errors.forEach((them)=>{
              them.style.visibility = 'hidden';
            })
            email.value = "";
            note.value = "";
            shown = true;
          }else{
            form.style.transform = "scale(0.1)";
            shown = false;
          }
        }
      })
      offs.forEach((off)=>{
        off.onclick=()=>{
          if(shown){
            localError.style.visibility = 'hidden';
            blur.classList.remove('view');
            form.style.transform = "scale(0.1)";
            errors.forEach((them)=>{
              them.style.visibility = 'hidden';
            })
            shown = false;
        }
    }
  })
  email.onkeyup =()=>{
    emailError.style.visibility = 'hidden';
  }
  note.onkeyup =()=>{
    noteError.style.visibility = 'hidden';
  }
  form.addEventListener('submit',(e)=>{
    if(localStorage.getItem('data') === null){
      if(email.value == "" && note.value == ""){
          errors.forEach((them)=>{
              them.style.visibility = "visible";
              e.preventDefault();
          })
      }
      if(email.value == ""){
        emailError.innerHTML = "Email cannot be empty!";
        emailError.style.visibility = "visible";
        e.preventDefault();
      }
      if(note.value == ""){
        noteError.innerHTML = "Alumni Note cannot be empty!";
        noteError.style.visibility = "visible";
        e.preventDefault();
      }
      if(note.value !== "I took CS50"){
        noteError.innerHTML = "type: 'I took CS50'! ";
        noteError.style.visibility = 'visible';
        e.preventDefault();
      }
      if(ValidateEmail(email) == false ){
        emailError.innerHTML = "Invalid Email!";
        emailError.style.visibility = "visible";
        e.preventDefault();
      }
      if(ValidateEmail(email) && note.value == "I took CS50"){
        let gender = sessionStorage.getItem('gender');
        if(gender == 'm' || gender == 'f'){
          const obj = {
            type:gender,
            mail:email.value
          };
          if(localStorage.getItem('data') === null){
            localStorage.setItem('data', JSON.stringify(obj));
          }
        }
      }
    }else{
      localError.style.visibility = 'visible';
      localError.innerHTML = 'You can only fill this Once!';
      e.preventDefault();
    }
  })
  // animateValue();
function getTotal(){
  const url = '/alumni_no';
  fetch(url)
    .then(response => response.json())
    .then(num => {
      animateValue("#enrolled", 199000, num, 500);
      animateValue("#menrolled", 199000, num, 500);
    })
    .catch(err => console.log(err))
}
getTotal();
  setInterval(() => {
    word.innerHTML = " ";
    word.innerHTML = "WAS";
    paused.forEach((ele) => {
      ele.style.animationPlayState = "running";
      setTimeout(() => {
        rocket.style.display = "none";
        imageDivs.forEach((div) => {
          div.style.visibility = "visible";
          imageIn();
        });
      }, 1000);
    });
  }, 2000);
  window.onscroll = ()=>{
    registerAnimation();
  }
});
function imageIn() {
  const images = document.querySelectorAll(".img div img");
  images.forEach((divv, i) => {
    divv.style.transform = "translateY(0%)";
  });
}
function animateValue(id, start, end, duration) {
  if (start === end) return;
  var range = end - start;
  var current = start;
  var increment = end > start ? 1 : -1;
  var stepTime = Math.abs(Math.floor(duration / range));
  var obj = document.querySelector(id);
  var timer = setInterval(function () {
    current += increment;
    obj.innerHTML = current;
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}
const triggerPoint = window.innerHeight/ 5 * 4;
function registerAnimation(){
    const card = document.querySelector('.register .cs');
    const below = document.querySelector('.register .txt');
    const cardTop = card.getBoundingClientRect().top;
    if(cardTop < triggerPoint){
        card.style.transform ='translateX(0)';
        below.style.transform ='translateX(0)';
    }
}

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value))
  {
    return (true)
  }
    return (false)
}

