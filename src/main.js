import { Scrollock } from "./scrollock.js";
import "./style.css";

const chat = document.querySelector(".chat");
const chatWrapper = document.querySelector(".chat__wrapper");
const chatBtn = document.querySelector(".chat__button");
const lock = new Scrollock({
    element: chat,
});

let isOpen = false;
chatBtn.addEventListener("click", function() {
    if (!isOpen) {
        chat.classList.add("is-open");
        lock.disableBodyScroll();
    } else {
        chat.classList.remove("is-open");
        chatWrapper.classList.remove("is-open");
        lock.enableBodyScroll();
    }
    isOpen = !isOpen;
});
