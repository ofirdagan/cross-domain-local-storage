cross-domain-local-storage
==========================

## Problem

As for now, standard HTML5 Web Storage (A.K.A Local Storage) doesn't now allow cross domain data sharing.
This may be a big problem in an organization which have a lot of sub domains and wants to share client data between them.

## Solution

xdLocalStorage is a lightweight js library which implements LocalStorage interface and support cross domain storage by using iframe post message communication.

## Why not use cookies?

Although cookies can be shared between sub domains, cookies have the overhead of being sent to the server on each request.
They're also have a size limit (4K for all cookies together)

## Installation

Download latest release from [here](https://github.com/ofirdagan/cross-domain-local-storage/releases) or use bower (recommended)
```sh
bower install xdLocalStorage --save

## Usage

1. Create an empty html with the following content:

```html
    <!DOCTYPE html>
    <html>
    <head>
        <script src="xdLocalStoragePostMessageApi.min.js"></script>
    </head>
    <body>
    This is the magical iframe
    </body>
    </html>

```

2. On your client page (the page you will read/store your data from) add:

```html

 <!-- if you use angular continue reading.. there's angular support -->
 <script src="scripts/xdLocalStorage.min.js"></script>
```

3. Init xdLocalStorage

```js

    xdLocalStorage.init(
        {
            /* required */
            iframeUrl:'path to your html from step 1',
            //an option function to be called right after the iframe was loaded and ready for action
            initCallback: function () {
                console.log('Got iframe ready');
            }
        }
    );
```

## API

```js

    // Store
    xdLocalStorage.setItem(key, value, function (data) {//callback});

    // Retrieve
    xdLocalStorage.getItem(key, function (data) {//callback });

    // Remove
    xdLocalStorage.removeItem(key, function (data) {//callback });

    // Key Name
    xdLocalStorage.key(index, function (data) {//callback });

    // Clear All
    xdLocalStorage.clear(function (data) {//callback });
```

## Angular Support

1. import `ng-xdLocalStorage.min.js` instead of `xdLocalStorage.min.js`

2. include xdLocalStorage module and config it.

```js
angular.module('yourModule', ['xdLocalStorage']).config(function (xdLocalStorageProvider) {
    xdLocalStorageProvider.init(
     {
        /* required */
        iframeUrl:'path to your html from step 1',
        //an option function to be called right after the iframe was loaded and ready for action
        initCallback: function () {
            console.log('Got iframe ready');
        }
    });
});

```

3. inject xdLocalStorage where ever you want and use the API

```js
angular.module('yourModule').run(function(xdLocalStorage) {
    xdLocalStorage.setItem(key, value, function (data) {//callback});
});

```

## Demo

**Here's the <a href="https://rawgit.com/ofirdagan/cross-domain-local-storage/master/app/index.html" target="_blank">demo</a>**

## Tests

I covered the basic API with tests [here](https://github.com/ofirdagan/cross-domain-local-storage/blob/master/test/specs/xdLocalStorage.js)