class Scrollock{constructor(a){const{element:b}=Object.assign({element:void 0,onlyTouch:!0},a);if(!b)throw new Error("You need to specify a selector!");this.el=b,this.initialClientY=0,this.passive=!1,this.isBodyOverflow=!1,this.preventBodyScroll=this.preventBodyScroll.bind(this),this.captureClientY=this.captureClientY.bind(this),this.preventOverscroll=this.preventOverscroll.bind(this)}enableBodyScroll(){this.setOverflowHidden(),this.el.removeEventListener("touchstart",this.captureClientY),this.el.removeEventListener("touchmove",this.preventOverscroll)}disableBodyScroll(){this.setOverflowHidden(),this.el.addEventListener("touchstart",this.captureClientY),this.el.addEventListener("touchmove",this.preventOverscroll)}/**
     * Prevent default unless within selector.
     *
     * @param  evt
     */preventBodyScroll(a){!1!==this.el&&a.target.closest(this.selector)||a.preventDefault()}/**
     * Cache the initialClientY co-ordinates for comparison.
     *
     * @param  evt
     */captureClientY(a){1===a.targetTouches.length&&(this.initialClientY=a.targetTouches[0].initialClientY)}/**
     * Detect whether the element is at the top or the bottom of their scroll
     * and prevent the user from scrolling beyond.
     *
     * @param  evt
     */preventOverscroll(a){if(1===a.targetTouches.length){const b=a.targetTouches[0].initialClientY-this.initialClientY;0===this.el.scrollTop&&0<b&&a.preventDefault(),this.el.scrollHeight-this.el.scrollTop<=this.el.clientHeight&&0>b&&a.preventDefault()}}setOverflowHidden(){if(!this.isBodyOverflow){const a=window.innerWidth-document.documentElement.clientWidth;0<a&&document.body.style.setProperty("padding-right",`${a}px`),document.body.style.setProperty("overflow","hidden")}else document.body.style.removeProperty("overflow");this.isBodyOverflow=!this.isBodyOverflow}}const chat=document.querySelector(".chat"),chatWrapper=document.querySelector(".chat__wrapper"),chatBtn=document.querySelector(".chat__button"),lock=new Scrollock({element:chat});let isOpen=!1;chatBtn.addEventListener("click",function(){isOpen?(chat.classList.remove("is-open"),chatWrapper.classList.remove("is-open"),lock.enableBodyScroll()):(chat.classList.add("is-open"),lock.disableBodyScroll()),isOpen=!isOpen});
