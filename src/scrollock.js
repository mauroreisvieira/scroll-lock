export class Scrollock {
    constructor(options) {
        const { element } = Object.assign(
            {
                element: undefined,
            },
            options
        );

        if (!element) {
            throw new Error("You need to specify a selector!");
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
        this.setOverflowHidden();
        this.el.removeEventListener("touchstart", this.captureClientY);
        this.el.removeEventListener("touchmove", this.preventOverscroll);
    }

    disableBodyScroll() {
        this.setOverflowHidden();
        this.el.addEventListener("touchstart", this.captureClientY);
        this.el.addEventListener("touchmove", this.preventOverscroll);
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
    }

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
    }

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

        if (this.el.scrollHeight - this.el.scrollTop <= this.el.clientHeight && initialClientY < 0) {
            evt.preventDefault();
        }
    }

    setOverflowHidden() {
        if (!this.isBodyOverflow) {
            const scrollBarGap = window.innerWidth - document.documentElement.clientWidth;

            if (scrollBarGap > 0) {
                document.body.style.setProperty("padding-right", `${scrollBarGap}px`);
            }

            document.body.style.setProperty("overflow", "hidden");
        } else {
            document.body.style.removeProperty("overflow");
        }

        this.isBodyOverflow = !this.isBodyOverflow;
    }
}
