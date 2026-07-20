document.addEventListener('DOMContentLoaded', function(){

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
    });

    
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

    document.querySelectorAll('.depth2-list a').forEach(function(link){
        link.addEventListener('click', closeMenu);
    });
});