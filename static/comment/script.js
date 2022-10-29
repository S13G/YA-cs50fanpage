

const pen = document.querySelector('#pen');
const formDiv = document.querySelector('main .form');
const form = document.querySelector('.form form');
const errors = document.querySelectorAll('.form .error');
const nameError = document.querySelector('.sub .name');
const commentError = document.querySelector('.sub .comment');
const codeName = document.querySelector('#name');
const comment = document.querySelector('#comment');
const alumna = document.querySelector('form #alumna');
const alumnus = document.querySelector('form #alumnus');
const formImgs = document.querySelectorAll('form img');
const localError = document.querySelector('.django-error');

let shown = false;
pen.onclick = ()=>{
    formDiv.classList.toggle('view');
    formImgs.forEach((ele)=>{ele.style.display = 'none'});
    if(!shown){
        form.style.transform = 'scale(1)';
        errors.forEach((them)=>{
            them.style.visibility = 'hidden';
          });
        if(localStorage.getItem('data') === null){
        const chosen = formImgs[Math.floor(Math.random() * formImgs.length)];
        chosen.style.display = 'block';
        }else{
            const data = localStorage.getItem('data');
            const obj = JSON.parse(data);
            if(obj.type == 'm'){
                alumnus.style.display = 'block';
            }
            if(obj.type == 'f'){
                alumna.style.display = 'block';
            }
        }
        codeName.value = '';
        comment.value = '';
        shown = true;
    }
}
function off(){
    if(shown){
        localError.style.visibility = 'hidden';
        formDiv.classList.remove('view');
        form.style.transform = "scale(0.1)";
        errors.forEach((them)=>{
          them.style.visibility = 'hidden';
        })
        shown = false;
    }
}

codeName.onkeyup =()=>{
    nameError.style.visibility = 'hidden';
}
comment.onkeyup =()=>{
    commentError.style.visibility = 'hidden';
}

  form.addEventListener('submit',(e)=>{
    if(localStorage.getItem('data') === null){
        localError.innerHTML = 'You havent joined Our <a href="../index.html">Alumni</a>'
        localError.style.visibility = 'visible';
        e.preventDefault();
    }else{
        const data = localStorage.getItem('data');
        const obj = JSON.parse(data);
        if(obj.type == 'm'){
            alumnus.style.display = 'block';
        }
        if(obj.type == 'f'){
            alumna.style.display = 'block';
        }
        if(codeName.value == "" && comment.value == ""){
            errors.forEach((them)=>{
                them.style.visibility = "visible";
                e.preventDefault();
            })
        }
        if(codeName.value == ""){
          nameError.innerHTML = "codeName cannot be empty!";
          nameError.style.visibility = "visible";
          e.preventDefault();
        }
        if(comment.value == ""){
          commentError.innerHTML = "Comment cannot be empty!";
          commentError.style.visibility = "visible";
          e.preventDefault();
        }
    }
  })

