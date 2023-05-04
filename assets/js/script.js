// const activePage = window.location.pathname;
// const navlinks = document.querySelectorAll('nav .main-nav li a').forEach(link => {
//     if(link.href.includes(`${activePage}`)){
//         link.classList.add('active');
//         console.log(link);
//     }
// })


const activePage = window.location.pathname;
const navlinks = document.querySelectorAll('nav .main-nav li a').forEach(link => {
    if (activePage !== "/" && link.href.includes(`${activePage}`) && !link.classList.contains('active')) {
        link.classList.add('active');
        console.log(link);
    }
});