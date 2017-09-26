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

Code Commenting
---------------

Generally I don't write gratuitous comments in the code. Instead, my goal is to write code that's clear enough to be self-documenting. Whether I've achieved that or not is only put to the test when other people read it -- which is part of why code reviews are so important.

The major exceptions are when I'm doing something that's "out of the ordinary". This is particularly important when there's some sort of external factor going on (ex: technical, related to the project history, etc.)

In my opinion, comments should be explaining "why" something is done in a particular way. The "what" should rarely, if ever, be documented; if the code is so confusing that it requires documentation to be understood, it should probably be refactored instead. In this particular project, I'll actually be commenting *more* than I usually would, as it's an exercise in describing my though process when developing.

Small, Encapsulated Files
-------------------------

Generally, I want to keep source files to one class per file, and one file per class. The same goes for other major bits of functionality, like large standalone functions and certain static data structures. There are exceptions, but they have to be minor and infrequent. (Ex: sometimes I'll have a class or enumeration that really only makes sense in the context of a single class. In those cases, I might bend this rule.)

Reduce vs Map
-------------

When processing an array of data, I'll generally go straight to the `reduce` function, even when I could conceivably use `map`. The reason behind this is:
* `map` is a strictly 1:1 between the source and result arrays, whereas `reduce` gives me the option to add fewer (or even more) elements to the result array than exist in the source.
* `reduce` allows me to generate any kind of data structure based on a source array, whereas `map` only returns an array. (I'll often use reduce to create an object map/dictionary/hash for example).
* Even if neither of the above are necessary currently, they might well be true in the future. If I need to change the transformation logic from a mapper to a reducer, and it's not already written using `reduce`, I then have to do extra work.
* `reduce` is baked into my muscle memory more than `map`, because of the above three points.

Similarly, I often won't bother with `forEach` when I can use `reduce`, especially when I can reduce the necessity for side effects.

Note: if there's a good reason to use `map` instead of `reduce`, I'll switch in a heartbeat. The best example I can think of is parallelization... but we don't have that option in JavaScript.