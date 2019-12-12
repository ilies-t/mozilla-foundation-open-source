// ----------------------------- default variable, functions, etc... ------------------------------
const $ = (_x) => {
    const _selected = document.querySelectorAll(_x);
    return (_selected.length <= 1) ? (_selected[0]) : _selected;
}

// smooth scroll
const scroll = new SmoothScroll('a[href*="#"]');

// --------------------------------------- main text effect ---------------------------------------
// function resize textPapa by textChild height and return textPapa height
const resizeParentBySize = (_textChild, _textPapa) => {
    const textSize = _textChild.clientHeight;
    _textChild.parentNode.parentNode.style.height = `${textSize}px`

    return (_textPapa.parentNode).clientHeight;
};

// NOTE : avoid vw & vh in CSS or consequences
let y = 0;
const anim = () => {
    // start this animation after 3sec
    setTimeout(anim, 3000);
    const textChild = $('.TBfont')[0];
    const textParent = textChild.parentNode;

    // get block height and add forEach += this.height
    const heightOfBlock = resizeParentBySize(textChild, textParent);

    // if Y is superior to text container height, this reloop
    y = (y < heightOfBlock*(textParent.childElementCount - 1)) ? y += heightOfBlock : 0;
    textParent.style.transform = (`transform`, `translateY(-${y}px)`);
}
// repeat this function each 2 sec
setTimeout(() => {
    anim();
}, 2500);

// ------------------------------------------- research -------------------------------------------
const childBar = $('#child-categbar'),
      allLi = $('div.categorize-of-projects > ul > li'),
      allCards = $('.card-project');

// create function to return current li 'active'
const getActiveLi = () => {
    return $('div.categorize-of-projects > ul > li.active');
}

// adapat the childBar with to 'active' li
const setBarStyle = () => {
    let _activeClass = getActiveLi();
    childBar.setAttribute( "style", `width: ${_activeClass.clientWidth}px; left: ${_activeClass.offsetLeft}px;`);
};
setBarStyle();

// click event
const verifyWithFilter = () => {
    // apply filter on research
    allCards.forEach(card => {
        /*
        ** '0' is all category and 'card.dataset.cardcateg' is card data category
        ** example: user click in 'internet' (3rd category), verify if chosen category is equal to '2' or '0'
        **          if is equal to '2' === add display: block
        **          else add display: none
        ** example: user click on 'all' (1st category), verify is dataset-categ of active li is equal to '0'
        **          if activeLi is === '0' add display: block
        **          else add display: none
        */
        const arrOfActiveTrue = ['0', card.dataset.cardcateg];
        let activeCateg = getActiveLi().dataset.categ;
        // so, verify card if this starter-pack block have '0' or chosen category
        $('.card-starter-pack').forEach(starterPackBlock => {
            // if active category is '0' (all), all starter-pack blocks will have 'none' display
            if(activeCateg === '0') {
                starterPackBlock.style.display = 'none';
            } else {
                starterPackBlock.style.display = starterPackBlock.dataset.cardcateg === activeCateg ? 'block' : 'none';
            }
        });
        card.style.display = (arrOfActiveTrue.includes(activeCateg)) ? 'block' : 'none';
    });
};
// '0' (all) is the default category because the first li have 'active' class
verifyWithFilter();

allLi.forEach(li => {
    // mouse enter
    li.addEventListener('mouseenter', e => {
        e.preventDefault();
        childBar.setAttribute("style", `width: ${li.clientWidth}px; left: ${li.offsetLeft}px;`);
    });

    // mouse leave
    li.addEventListener('mouseleave', e => {
        e.preventDefault();
        setBarStyle();
    });

    li.addEventListener('click', e => {
        e.preventDefault();
        // add 'active' class to selected
        getActiveLi().classList.remove('active');
        li.classList.add('active');
        verifyWithFilter();
        // remove "no results" if there are result
        $('#no-result-message').classList.remove('on');
    })
});

// ---------------------------------------- research input ----------------------------------------
const formSubmit = (event) => {
    event.preventDefault();
    // remove 'active' if user select other category than 'all'
    getActiveLi().classList.remove('active');
    // so, update to 'all' category
    const activeCateg = $('div.categorize-of-projects > ul > li')[0];
    activeCateg.className = 'active';
    verifyWithFilter();
    setBarStyle();
    // this is a test
    const allBlocks = [], allBlockDisplay = [];
    $('.card-project.card-default-properties').forEach(block => {
        allBlocks.push(block);
    });
    const word = $('form.search-block.card-default-properties > input').value;
    let result, textInBlock;
    allBlocks.forEach(block => {
        // textInBlock = parent > div.card-title-content > h3.innerHTML
        textInBlock = block.children[0].children[1].children[0].innerHTML;
        // use algorien to have % similarity between research word and block h3 value
        result = algorien.search(word, textInBlock);
        // if similarity is superior to 15%, block will have 'block' display
        block.style.display = (result >= 15.01) ? 'block' : 'none';
        allBlockDisplay.push(block.style.display);
    });

    // display "no result"
    allBlockDisplay.every((x) => {return x === "none"}) ? $('#no-result-message').classList.add('on') : $('#no-result-message').classList.remove('on');
}

// ---------------------------------------- scroll reveal -----------------------------------------
/*
const sr = ScrollReveal();
sr.reveal('div', { origin: 'bottom', distance: '50px', delay: 600, duration: 1000, });
*/

// --------------------------------------- window functions ---------------------------------------
window.onload = (() => {
    resizeParentBySize($('.TBfont')[0], $('.TBfont')[0].parentNode);
    setTimeout(() => {
        $('header').classList.remove('onload');
        $('body').classList.remove('block-scroll');
        $('div#loader-container').classList.add('off-load');
    }, 750);
});
window.onresize = (() => {
    resizeParentBySize($('.TBfont')[0], $('.TBfont')[0].parentNode);
});
