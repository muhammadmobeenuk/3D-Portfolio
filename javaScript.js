// turn pages when its clicked next or previous button

const pageNextBtn = document.querySelectorAll(".nextprev-btn");

pageNextBtn.forEach((el, index) => {
  el.onclick = () => {
    const pageTurnId = el.getAttribute('data-page');
    const pageTurn = document.getElementById(pageTurnId);
    console.log(pageTurn);
    
    if (pageTurn.classList.contains('turn')) {
      pageTurn.classList.remove('turn');
      setTimeout(() => {
        pageTurn.style.zIndex = 20 - index;
      }, 500);
    } else {
      pageTurn.classList.add('turn');
      setTimeout(() => {
        pageTurn.style.zIndex = 20 + index;
      }, 500);
    }
  };
});

//Turn to the contactMe page and then contact me to profile page

// const pages = document.querySelectorAll('book-page.page-right');

// // Contact-Me page
// const contactMe = document.querySelector('.btn.contact-me');
//  contactMe.forEach((element , index) => {
//     element.onclick = () =>  {
//     const pagesTurn = document.getAttribute('data-page');
//     setTimeout(() => {
//       pagesTurn.style.zIndex = 20 - index;
//     }, (index + 1) * 200 + 100, pagesTurn);}
//   })
