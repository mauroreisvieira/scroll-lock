class Scrollock {
    constructor(options) {
        const { element, initialClientY, passive } = Object.assign({
            element: undefined,
            onlyTouch: true
        }, options);

        if (!element) {
            throw new Error('You need to specify a selector!');
        }

        this.el = element;
        this.initialClientY = 0;
        this.passive = false;

        this.isBodyOverflow = false;

        this.preventBodyScroll = this.preventBodyScroll.bind(this);
        this.captureClientY = this.captureClientY.bind(this);
        this.preventOverscroll = this.preventOverscroll.bind(this);
    }

    enableBodyScroll() {
        this.setOverflowHidden(false);
        this.el.removeEventListener('touchstart', this.captureClientY);
        this.el.removeEventListener('touchmove', this.preventOverscroll);
    }

    disableBodyScroll() {
        this.setOverflowHidden(true);
        this.el.addEventListener('touchstart', this.captureClientY);
        this.el.addEventListener('touchmove', this.preventOverscroll);
    }

    /**
     * Prevent default unless within selector.
     *
     * @param  evt
     */
     preventBodyScroll(evt) {
         if (this.el === false || !evt.target.closest(this.selector)) {
             evt.preventDefault();
         }
     };

    /**
     * Cache the initialClientY co-ordinates for comparison.
     *
     * @param  evt
     */
     captureClientY(evt) {
        // only respond to a single touch
        if (evt.targetTouches.length === 1) {
            this.initialClientY = evt.targetTouches[0].initialClientY;
        }
    };

    /**
     * Detect whether the element is at the top or the bottom of their scroll
     * and prevent the user from scrolling beyond.
     *
     * @param  evt
     */
     preventOverscroll(evt) {
         if (evt.targetTouches.length !== 1) {
             return;
         }

         const initialClientY = evt.targetTouches[0].initialClientY - this.initialClientY;
         if (this.el.scrollTop === 0 && initialClientY > 0) {
             evt.preventDefault();
         }

         if ((this.el.scrollHeight - this.el.scrollTop <= this.el.clientHeight) && initialClientY < 0) {
             evt.preventDefault();
         }
     };

     setOverflowHidden() {
         if (!this.isBodyOverflow) {
             document.body.style.setProperty('overflow', 'hidden');
         } else {
             document.body.style.removeProperty('overflow');
         }

         this.isBodyOverflow = !this.isBodyOverflow;
     }
 }

const chat = document.querySelector('.chat');
const chatWrapper = document.querySelector('.chat__wrapper');
const chatBtn = document.querySelector('.chat__button');
const lock = new Scrollock({
    element: chat
});

let isOpen = false;
chatBtn.addEventListener('click', function() {
    if(!isOpen) {
        chat.classList.add('is-open');
        lock.disableBodyScroll();
    } else {
        chat.classList.remove('is-open');
        chatWrapper.classList.remove('is-open');
        lock.enableBodyScroll();
    }
    isOpen = !isOpen;
});
