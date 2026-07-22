document.addEventListener('DOMContentLoaded', function(){

    const header = document.querySelector('.main-header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function(){
        const currentScrollY = window.scrollY;

        if(currentScrollY === 0) {
            header.classList.remove('is-scrolled', 'is-hidden');
        } else if (currentScrollY > lastScrollY){
            header.classList.add('is-hidden');
            header.classList.remove('is-scrolled');
        } else {
            header.classList.remove('is-hidden');
            header.classList.add('is-scrolled');
        }

        lastScrollY = currentScrollY;
    });

    const timelineItems = document.querySelectorAll('.timeline-item');
    const stagePanels = document.querySelectorAll('.stage-panel');

    function activateStage(stageId) {
        timelineItems.forEach(function(item) {
            if (item.dataset.stage === stageId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        stagePanels.forEach(function(panel) {
            if (panel.id === stageId) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
    }

    timelineItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const stageId = this.dataset.stage;
            activateStage(stageId);
            history.replaceState(null, '', '#' + stageId);
            document.querySelector('.stage-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    const checkItems = document.querySelectorAll('.check-list li');
    checkItems.forEach(function(item) {
        item.addEventListener('click', function() {
            this.classList.toggle('is-checked');
        });
    });

    function activateByHash() {
        const hash = window.location.hash.replace('#', '');
        if (hash && document.getElementById(hash)) {
            activateStage(hash);
        }
    }
    activateByHash();
    window.addEventListener('hashchange', activateByHash);

});