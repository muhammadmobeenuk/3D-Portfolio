// turn pages when its clicked next or previous button

const pageNextBtn = document.querySelectorAll('.nextprev-btn');

pageNextBtn.forEach((el,index) => {
    el.onclick = () => {
        const pageTurnId = el.getAttribute ("data-page");
        const pageTurn = document.getElementById(pageTurnId);

        if(pageTurn.classList.contains('turn')){
            pageTurn.classList.remove('turn')
        }else{
            pageTurn.classList.add('turn')
        }
    }
    
});