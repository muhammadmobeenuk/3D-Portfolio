// turn pages when its clicked next or previous button

const pageNextBtn = document.querySelectorAll(".nextprev-btn");

pageNextBtn.forEach((el, index) => {
  el.onclick = () => {
    const pageTurnId = el.getAttribute("data-page");
    const pageTurn = document.getElementById(pageTurnId);
    console.log(pageTurn);

    if (pageTurn.classList.contains("turn")) {
      pageTurn.classList.remove("turn");
      setTimeout(() => {
        pageTurn.style.zIndex = 20 - index;
      }, 500);
    } else {
      pageTurn.classList.add("turn");
      setTimeout(() => {
        pageTurn.style.zIndex = 20 + index;
      }, 500);
    }
  };
});

//Turn to the contactMe page and then contact me to profile page


//book pages
const bookPages = document.querySelectorAll(".book-page.page-right");
//contact me page
const contactMeBtn = document.querySelector(".btn.contact-me");
contactMeBtn.onclick = () => {
  bookPages.forEach((page, index) => {
    setTimeout(() => {
      page.classList.add("turn");
      setTimeout(() => {
        page.style.zIndex = 20 + index;
      }, 500);
    }, (index + 1) * 200 + 100);
  });
};

//Back to profile page
let totalpages = bookPages.length;
let pageNumber = 0;
function backToProfilePage(){
  pageNumber--;
  if (pageNumber < 0) {
    pageNumber = totalpages -1;
  }
}
const backToProfile = document.querySelector(".back-profile");
backToProfile.onclick = () => {
  bookPages.forEach((_, index) => {
    setTimeout(() => {
      backToProfilePage();
      bookPages[pageNumber].classList.remove("turn");
      setTimeout(() => {
        backToProfilePage();
        bookPages[pageNumber].style.zIndex = 10 + index;
      }, 500);
    }, (index + 1) * 200 + 100);
  });
};
