document.addEventListener('DOMContentLoaded', function(){
    const header = document.querySelector('.main-header');
    const bottomNav = document.querySelector('.mobile-bottom-nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function(){
        const currentScrollY = window.scrollY;

        if(currentScrollY === 0) {
            header.classList.remove('is-scrolled', 'is-hidden');
            if(bottomNav) bottomNav.classList.add('is-hidden');

        } else if (currentScrollY > lastScrollY){
            header.classList.add('is-hidden');
            header.classList.remove('is-scrolled');
            if(bottomNav) bottomNav.classList.remove('is-hidden');

        } else {
            header.classList.remove('is-hidden');
            header.classList.add('is-scrolled');
            if(bottomNav) bottomNav.classList.add('is-hidden');
        }

        lastScrollY = currentScrollY;
    });

    const solutionTabBtns = document.querySelectorAll('.solution-tabs button');
    const solutionPanels = document.querySelectorAll('.solution-panel');

    solutionTabBtns.forEach(function(btn){
        btn.addEventListener('click', function(){
            const targetId = this.getAttribute('data-target');

            solutionTabBtns.forEach(function(b){
                if(b.getAttribute('data-target') === targetId){
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });

            solutionPanels.forEach(function(p){
                p.classList.remove('active');
            });

            const targetPanel = document.getElementById(targetId);
            if(targetPanel) {
                targetPanel.classList.add('active');
                if(window.innerWidth < 1024){
                    window.scrollTo({top:0, behavior:'smooth'});
                }
            }
        });
    });

    const subTabBtns = document.querySelectorAll('.sub-tabs button');

    subTabBtns.forEach(function(btn){
        btn.addEventListener('click', function(){
            const targetSubId = this.getAttribute('data-sub');

            const parentSubTabs = this.closest('.sub-tabs');
            parentSubTabs.querySelectorAll('button').forEach(function(b){
                b.classList.remove('active');
            });
            this.classList.add('active');

            const parentSection = this.closest('.solution-panel');
            parentSection.querySelectorAll('.sub-panel').forEach(function(p){
                p.classList.remove('active');
            });
            const targetSubPanel = parentSection.querySelector('#' + targetSubId);
            if(targetSubPanel) targetSubPanel.classList.add('active');
        });
    });

    function activateTabByHash(){
        const hash = window.location.hash.replace('#','');
        if(!hash) return;

        const subBtn = document.querySelector(`.sub-tabs button[data-sub="${hash}"]`);
        if(subBtn){
            const parentSection = subBtn.closest('.solution-panel');
            const parentTargetId = parentSection.id;
            const parentTabBtn = document.querySelector(`.solution-tabs button[data-target="${parentTargetId}"]`);
            if(parentTabBtn) parentTabBtn.click();

            subBtn.click();
            return;
        }

        const targetBtn = document.querySelector(`.solution-tabs button[data-target="${hash}"]`);
        if(targetBtn) targetBtn.click();
    }

    activateTabByHash();
    window.addEventListener('hashchange', activateTabByHash);
});