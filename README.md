# Scroll Lock

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
const btnElement = document.querySelector('#someBtn');
const lock = new Scrollock({
    element: targetElement
});

let isOpen = false;

btnElement.addEventListener('click', function() {
    if (!isOpen) {
        body.classList.add('is-lock');
        lock.disableBodyScroll();
    } else {
        body.classList.remove('is-lock');
        lock.enableBodyScroll();
    }
    isOpen = !isOpen;
});
```
