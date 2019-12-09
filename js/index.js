// ----------------------------- default variable, functions, etc... ------------------------------
const $ = (_x) => {
    const _selected = document.querySelectorAll(_x);
    return (_selected.length <= 1) ? (_selected[0]) : _selected;
}

// smooth scroll
var scroll = new SmoothScroll('a[href*="#"]');

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
    // start this animation after 2sec
    setTimeout(anim, 2500);
    const textChild = $('.TBfont')[0];
    const textParent = textChild.parentNode;

    // get block height and add forEach += this.height
    const heightOfBlock = resizeParentBySize(textChild, textParent);

    // if y is superior to text container height, this reloop
    // remove 'smoothanim' class to avoid animation effect when reloop
    y = (y < heightOfBlock*(textParent.childElementCount - 1)) ? y += heightOfBlock : 0;
    textParent.style.transform = (`transform`, `translateY(-${y}px)`);
}
// repeat this function each 2 sec
setTimeout(() => {
    anim();
}, 2500);

// resize automatically the height of text parent
window.onload = (() => {
    resizeParentBySize($('.TBfont')[0], $('.TBfont')[0].parentNode);
});

// when user resize window, recalculate the height of fontSize
window.onresize = (() => {
    resizeParentBySize($('.TBfont')[0], $('.TBfont')[0].parentNode);
});

// ------------------------------------------- research -------------------------------------------
const childBar = $('#child-categbar'),
      allLi = $('div.categorize-of-projects > ul > li'),
      allCards = $('.card-project');

// create function to return current li 'active'
const getActiveLi = () => {
    return $('div.categorize-of-projects > ul > li.active');
}

// set childBar attribute to 'active' li
const setAttributeToActive = () => {
    let _activeClass = getActiveLi();
    childBar.setAttribute( "style", `width: ${_activeClass.clientWidth}px; left: ${_activeClass.offsetLeft}px;`);
};

setAttributeToActive();

// click event
const verify = () => {
    // apply filter on research
    allCards.forEach(card => {
        /*
        ** '0' is all category and 'card.dataset.cardcateg' is chosen category
        ** example: user click in 'internet' (3rd category), verify if chosen category is equal to '2' or '0'
        **          if is equal to '2' === add display: block
        **          else add display: none
        ** example: user click on 'all' (1st category), verify is dataset-categ of active li is equal to '0'
        **          if activeLi is === '0' add display: block
        **          else add display: none
        */
        const arrOfActiveTrue = ['0', card.dataset.cardcateg];
        // so, verify card if she have '0' or chosen category
        card.style.display = (arrOfActiveTrue.includes(getActiveLi().dataset.categ)) ? 'block' : 'none';
    });
};

allLi.forEach(li => {
    // mouse enter
    li.addEventListener('mouseenter', e => {
        childBar.setAttribute("style", `width: ${li.clientWidth}px; left: ${li.offsetLeft}px;`);
    });

    // mouse leave
    li.addEventListener('mouseleave', e => {
        setAttributeToActive();
    });

    li.addEventListener('click', e => {
        // add 'active' class to selected
        getActiveLi().classList.remove('active');
        li.classList.add('active');
        verify();
    })
});

// ---------------------------------------- research input ----------------------------------------
const formSubmit = () => {
    getActiveLi().classList.remove('active');
    const activeCateg = $('div.categorize-of-projects > ul > li')[0];
    activeCateg.className = 'active';
    verify();
    setAttributeToActive();
    // this is a test
    const allBlocks = [];
    $('.card-project.card-default-properties').forEach(block => {
        allBlocks.push(block);
    });
    const word = $('form.search-block.card-default-properties > input').value;
    let result, textInBlock;
    allBlocks.forEach(block => {
        // parent > div.card-title-content > h3
        textInBlock = block.children[0].children[1].children[0].innerHTML;
        // use algorien to have to % similarity between research word and block h3 value
        result = algorien.search(word, textInBlock);
        block.style.display = (result >= 35.01) ? 'block' : 'none';
    });
    // if contain no result
}
