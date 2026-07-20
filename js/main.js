document.addEventListener('DOMContentLoaded', function(){
    const markers = document.querySelectorAll('.pulse-marker');
    const allSheets = document.querySelectorAll('.bottom-sheet');
    const sheetDim = document.getElementById('sheet-dim');
    const btnCloses = document.querySelectorAll('.btn-sheet-close');
    const pcTabBtns = document.querySelectorAll('.tab-btn')

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

                if(window.matchMedia('(min-width:1024px)').matches){

                    pcTabBtns.forEach(function(btn){
                        btn.classList.remove('active');
                    });

                    const targetTabBtn = document.querySelector(`.pc-tab-menu .tab-btn[data-target="${targetId}"]`);

                    if(targetTabBtn) {
                        targetTabBtn.classList.add('active');
                    }
                }
            }
        });
    });

    btnCloses.forEach(function(btn){
        btn.addEventListener('click', closeAllSheets);
    });
    sheetDim.addEventListener('click', closeAllSheets);

    pcTabBtns.forEach(function(btn){
        btn.addEventListener('click', function(){
            
            pcTabBtns.forEach(function(item){
                item.classList.remove('active');
            });
            allSheets.forEach(function(sheet){
                sheet.classList.remove('active');
            })

            this.classList.add('active');

            const targetId = this.getAttribute('data-target');
            const targetSheet = document.getElementById(targetId);

            if(targetSheet) {
                targetSheet.classList.add('active');
            }
        });
    });

    const pcMediaQuery = window.matchMedia('(min-width: 1024px)');

    const symptomBtns = document.querySelectorAll('.symptom-btn');

    symptomBtns.forEach(function(btn){
        btn.addEventListener('click', function(){
            const parentSheet = this.closest('.bottom-sheet');
            const bodyPart = parentSheet.id.replace('sheet-','');

            window.location.href = 'solution.html#' + bodyPart;
        });
    });

    function handleScreenResize(e) {
        if (e.matches){
            const firstTabBtn = document.querySelector('.pc-tab-menu .tab-btn');

            if (firstTabBtn) {
                firstTabBtn.click();
            }
        } else {
            pcTabBtns.forEach(function(item) {
                item.classList.remove('active');
            });
            allSheets.forEach(function(sheet){
                sheet.classList.remove('active');
            });
        }
    }
    pcMediaQuery.addEventListener('change', handleScreenResize);

    handleScreenResize(pcMediaQuery);

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
    });
});