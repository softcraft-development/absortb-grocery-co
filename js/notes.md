JavaScript
==========

Compatibility
-------------

I'm going to use widely-available ES6-compatible features (ex: classes) for developer convenience. We don't have any information about what browsers we're planning on supporting, so it'd only be extra work to try and go out of our way to support non-ES6 browsers like Internet Explorer. In a real-world app, I'd more likely be using a transpiler (probably TypeScript) to write advanced JS/TS that's also backwards-compatible. Again, for this app, that's unnecessary; we're trying to keep it as vanilla as possible.

Modularization
--------------

"Vanilla" JS in the browser doesn't (widely) support any of the modularization options from ES6 or the various transpilers. So, for this project, I'm using "older" techniques:
* Namespacing via objects
* Explicit <script> includes.

Neither of these are what I'd do on real-world projects.
