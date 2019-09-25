class Scrollock{constructor(a){const{element:b,clientY:c,passive:d}=Object.assign({element:void 0,onlyTouch:!0},a);this.el=b,this.clientY=0,this.passive=!1,this.preventBodyScroll=this.preventBodyScroll.bind(this),this.captureClientY=this.captureClientY.bind(this),this.preventOverscroll=this.preventOverscroll.bind(this)}enableBodyScroll(){window.removeEventListener("touchmove",this.preventBodyScroll,{passive:this.passive}),this.el.removeEventListener("touchstart",this.captureClientY),this.el.removeEventListener("touchmove",this.preventOverscroll)}disableBodyScroll(){this.el.addEventListener("touchstart",this.captureClientY),this.el.addEventListener("touchmove",this.preventOverscroll),window.addEventListener("touchmove",this.preventBodyScroll,{passive:this.passive})}/**
     * Prevent default unless within selector.
     *
     * @param  evt
     */preventBodyScroll(a){!1!==this.el&&a.target.closest(this.selector)||a.preventDefault()}/**
     * Cache the clientY co-ordinates for comparison.
     *
     * @param  evt
     */captureClientY(a){1===a.targetTouches.length&&(this.clientY=a.targetTouches[0].clientY)}/**
     * Detect whether the element is at the top or the bottom of their scroll
     * and prevent the user from scrolling beyond.
     *
     * @param  evt
     */preventOverscroll(a){if(1===a.targetTouches.length){var b=a.targetTouches[0].clientY-this.clientY;0===this.el.scrollTop&&0<b&&a.preventDefault(),this.el.scrollHeight-this.el.scrollTop<=this.el.clientHeight&&0>b&&a.preventDefault()}}}const body=document.querySelector("body"),chat=document.querySelector(".chat"),chatWrapper=document.querySelector(".chat__wrapper"),chatBtn=document.querySelector(".chat__button"),lock=new Scrollock({element:chat});let isOpen=!1;chatBtn.addEventListener("click",function(){isOpen?(body.classList.remove("is-lock"),chat.classList.remove("is-open"),chatWrapper.classList.remove("is-open"),lock.enableBodyScroll()):(body.classList.add("is-lock"),chat.classList.add("is-open"),lock.disableBodyScroll()),isOpen=!isOpen});
