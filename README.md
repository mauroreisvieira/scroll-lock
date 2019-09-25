# Scroll Lock

Lock body scroll without breaking scrolling of a target element (only for touch devices).

## Project Setup

``` bash
# Using npm
npm install

# Using Yarn
yarn add
```

### Compiles and hot-reloads for development

``` bash
yarn run dev
```

### Compiles and minifies for production

``` bash
yarn run build
```

### Lints and fixes files

``` bash
yarn run lint
```

## Usage examples

```js
import { Scrollock } from "./scrollock.js";

const targetElement = document.querySelector('#someElement');
const lock = new Scrollock({
    element: targetElement
});

let isOpen = false;

document.querySelector('.btn').addEventListener('click', function() {
    if (!isOpen) {
        lock.disableBodyScroll();
    } else {
        lock.enableBodyScroll();
    }
    isOpen = !isOpen;
});
```

## Support Tested

- iOS (Safari 13 & Chrome 76)
- Android (Brave 1.3.2 & Chrome 77)
