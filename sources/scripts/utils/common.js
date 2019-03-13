const Center = (function() {

    function element(el) {
        let top = Math.max((window.innerHeight - el.offsetHeight) / 2, 0),
            left = Math.max((window.innerWidth - el.offsetWidth) / 2, 0);
        el.style.top = top + "px";
        el.style.left = left + "px";
    };
    return {
        el: element
    };

})();

export { Center };