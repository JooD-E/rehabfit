document.addEventListener('DOMContentLoaded', function(){
    const btnOpen = document.getElementById('btn-menu-open');
    const btnClose = document.getElementById('btn-menu-close');
    const mainMenu = document.querySelector('.main-menu');
    const menuDim = document.getElementById('menu-dim');
    const gnbTitles = document.querySelectorAll('.gnb-title');

    btnOpen.addEventListener('click', function(){
        mainMenu.classList.add('active');
        menuDim.classList.add('active');
    });

    const closeMenu = function(){
        mainMenu.classList.remove('active');
        menuDim.classList.remove('active');
    };

    btnClose.addEventListener('click', closeMenu);
    menuDim.addEventListener('click', closeMenu);

    gnbTitles.forEach(function(title){
        title.addEventListener('click', function(e){
            e.preventDefault();

            const depth2 = this.nextElementSibling;
            
            if(depth2 && depth2.classList.contains('depth2-list')){
                const isOpen = depth2.classList.contains('open');

                document.querySelectorAll('.depth2-list').forEach(function(List){
                    List.classList.remove('open');
                });
                if(!isOpen){
                    depth2.classList.add('open');
                }
            }
        });
    });


    const markers = document.querySelectorAll('.pulse-marker');
    const allSheets = document.querySelectorAll('.bottom-sheet');
    const sheetDim = document.getElementById('sheet-dim');
    const btnCloses = document.querySelectorAll('.btn-sheet-close');

    const closeAllSheets = function(){
        sheetDim.classList.remove('active');
        allSheets.forEach(function(sheet){
            sheet.classList.remove('active');
        });
    };

    markers.forEach(function(marker){
        marker.addEventListener('click', function(){
            const targetId = this.getAttribute('data-target');
            const targetSheet = document.getElementById(targetId);

            if(targetSheet) {
                closeAllSheets();

                sheetDim.classList.add('active');
                targetSheet.classList.add('active');
            }
        });
    });

    btnCloses.forEach(function(btn){
        btn.addEventListener('click', closeAllSheets);
    });
    sheetDim.addEventListener('click', closeAllSheets);


    const header = document.querySelector('.main-header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function(){
        const currentScrollY = window.scrollY;

        if(currentScrollY === 0) {
            header.classList.remove('is-scrolled', 'is-hidden');
        } else if ( currentScrollY > lastScrollY){
            header.classList.add('is-hidden');
            header.classList.remove('is-scrolled');
        } else {
            header.classList.remove('is-hidden');
            header.classList.add('is-scrolled');
        }
        lastScrollY = currentScrollY;
    })

    const routineSwiper = new Swiper('.routine-swiper', {
        slidesPerView: 1.2,
        spaceBetween: 16,
        grabCursor: true,
        breakpoints: {
            480: {
                slidesPerView:1.5,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2.2,
                spaceBetween: 24,
            }
        }
    })
});