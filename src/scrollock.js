export class Scrollock {
    constructor(options) {
        const { element, clientY, passive } = Object.assign({
            element: undefined,
            onlyTouch: true
        }, options);

        this.el = element;
        this.clientY = 0;
        this.passive = false;

        this.preventBodyScroll = this.preventBodyScroll.bind(this);
        this.captureClientY = this.captureClientY.bind(this);
        this.preventOverscroll = this.preventOverscroll.bind(this);
    }

    enableBodyScroll() {
        window.removeEventListener('touchmove', this.preventBodyScroll, { passive: this.passive });
        this.el.removeEventListener('touchstart', this.captureClientY);
        this.el.removeEventListener('touchmove', this.preventOverscroll);
    }

    disableBodyScroll() {
        this.el.addEventListener('touchstart', this.captureClientY);
        this.el.addEventListener('touchmove', this.preventOverscroll);
        window.addEventListener('touchmove', this.preventBodyScroll, { passive: this.passive });
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
     * Cache the clientY co-ordinates for comparison.
     *
     * @param  evt
     */
    captureClientY(evt) {
        // only respond to a single touch
        if (evt.targetTouches.length === 1) {
            this.clientY = evt.targetTouches[0].clientY;
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

        var clientY = evt.targetTouches[0].clientY - this.clientY;
        if (this.el.scrollTop === 0 && clientY > 0) {
            evt.preventDefault();
        }

        if ((this.el.scrollHeight - this.el.scrollTop <= this.el.clientHeight) && clientY < 0) {
            evt.preventDefault();
        }
    };
}
