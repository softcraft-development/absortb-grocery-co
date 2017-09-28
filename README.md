GroceryCo Checkout System
=========================

A challenge project by Craig Walker for Absorb Software, Inc.

Installation and Deployment
---------------------------

This project is created entirely with static files; no build step is necessary. Simply copy all files from the "src" directory to your location of choice. 

There is one deployment caveat. As the app loads JSON documents using `fetch()` (as a real-world application would), you must load the application through an HTTP server (since `fetch()` doesn't load JSON via `file://` URLs.)

You can use any HTTP server that you like. You can install the simple node.js-based webserver `http-server` by doing the following:

1. Ensure that you have [NPM installed](https://www.npmjs.com/).
1. At a command prompt, change to the directory to which you copied the project files.
1. Run: `npm install`.
1. Run: `node_modules/.bin/http-server src`.
    * This starts an HTTP server for the files in the `/src` directory on port 8080.
    * Feel free to modify the command options (ie: port) if you like.
1. Nagivate to `http://localhost:8080`
    * Adjust the domain and port as necessary.

Design Notes
------------

I've written extensive notes throughout the project. They're stored in files named `notes.md` in several directories (nearest to where they're most applicable):

* [Root](./notes.md)
* [spec/js](./spec/js/notes.md)
* [src/api/customer/_customerId](./src/api/customer/_customerId_/notes.md)
* [src/api](./src/api/notes.md)
* [src/js](./src/js/notes.md)
* [src/js/promotion](./src/js/promotions/notes.md)

There are also code comments where applicable discussion various assumptions and design choices.

Tests
-----

There is an extensive test suite which illustrates my style & philosophy of testing. The test suite is written in Jasmine; you can run the suite by loading [spec/tests.html][./spec/tests.html]. (Note: unlike the main application, you can successfully load this page directly from the filesystem. You can also deploy the `spec` directory alongside the `src` directory to your web server and run it from there.)
