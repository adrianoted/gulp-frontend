import { Center } from '../utils/common';

const Modal = (function() {

    //DOM Cache
    const modal = document.querySelector('.modal'),
          modalBox = modal.querySelector('.modal-box'),
          closeBtn = modal.querySelector('.closeBtn');

    //Methods
    let center = () => { Center.el(modalBox) },
        open = (options) => {
            //open Modal
            modal.classList.add('open');

            //center the Modal
            center();
            window.addEventListener('resize', center);
            if(options) modalBox.classList.add(options.class);

            //close Modal
            let close = (e) => {
                e.preventDefault();
                modal.classList.remove('open');
            if(options) modalBox.classList.remove(options.class);
            };
            
            closeBtn.addEventListener("click", close);

        }

    //PUBLIC
    return {
        open: open
    }

})();

export { Modal };