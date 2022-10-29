const menu = document.querySelector(".menu");
const backdrop = document.querySelector("main .backdrop");
const slide = document.querySelector(".backdrop .slide-in");
isClicked = false;

function show() {
  backdrop.classList.toggle("color");
  backdrop.classList.toggle("visible");
  document.querySelector("body").classList.toggle("hidden");
  menu.classList.toggle("rotate");
  if (!isClicked) {
    slide.classList.remove("right");
    isClicked = true;
  } else {
    slide.classList.add("right");
    isClicked = false;
  }
}
// This function works only if the mobile nav is in display
function noShow() {
  if (isClicked) {
    document.querySelector("body").classList.toggle("hidden");
    backdrop.classList.toggle("color");
    backdrop.classList.toggle("visible");
    menu.classList.toggle("rotate");
    slide.classList.toggle("right");
    isClicked = false;
  }
}