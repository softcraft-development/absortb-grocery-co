Display
=======

Not Reinventing Any Wheels
--------------------------

This UI implementation is intentionally crude, in the name of simplicity and time. There's lots of better approaches to DOM manipulation, but none of them are really "Vanilla JS". 

A lot of how I'm doing UI work here is reminiscint of Backbone. (For instance, any variable that holds a DOM object has a dollar-sign $prefix; this is a Backbone-ism.) IMO, it's a fine system that's out of fashion currently. If I was doing a major project today, I'd still probably choose React; the pros and cons of each are an entire conversation.

Text Fields
-----------

    A read-only text field to show the name of the product

I'm not sure if there's an intent for this to be an actual read-only \<input> field here, but by and large I avoid doing that, because:
* It's unnecessary additional coding (vs. just a \<span> or \<label>)
* It's confusing to devs
* It confuses users, who are trained to see text fields as editable (and then be stymied)
* It runs the risk of submitting unnecessary information if the field ever becomes writable
* It will probably confuse screen readers (and the people that use them)
* It will require extra CSS to (de)style.

In my communication, I reserve the world "field" for user-editable controls that accept data.

Quantity Field Lockout
----------------------

    Your quantity input field should not allow the customer to enter in a number that exceeds the available items in the kiosk’s inventory.

I'm going to take this to mean "the form should indicate when you've entered a number that exceeds the available items in the inventory, and should not let you submit it."

It's not good UX to actually disallow entering the number into the field if the number is ultimately invalid. In the example form, the user doesn't know how much is in inventory (ie: what a valid quantity is). Even if that number is displayed, it's a mental / visual leap for them to connect the inventory value to their own quantity. 

If the UI simply disallows the user from typing the appropriate number, it's basically ignoring a user action (ie: typing a character on the keyboard). There's no feedback to the user about *why* this is the case -- just a silent rejection. That's confusing and frustrating.

Instead, if you allow them to enter any data, but display a validation message when they enter incorrect data, then they can be informed about their error, correct it, and also gain deeper understanding into how the system works. 

This tactic also works for other kinds of validation errors. What if the user enters nonnumeric characters? Display an error message vs reject all of those keystrokes?

The "display validation message on field error" technique is also standard practice on the web, and so implementing this meets users' general expectations on how forms work.

Basket Form Layout
------------------

The mockup has the controls laid out in what appears to be a grid. Notably, the "quantity" label exists once, above a column of quantity fields. 

Grids don't respond well to different screen sizes, as they don't allow / promote wrapping of fields with the available width shrinks. With static mockups, it's easy to overlook this fact. Tou can lay out a grid that looks good given the size that you've chosen, but you can't (generally) reshape the mockup window to see how the layout behaves under different widths. 

In order to illustrate a responsive design, I'm going to create a layout that isn't fixed into the grid model, while still providing good UX.

Internationalization
--------------------

I'm hardcoding text strings into the HTML & JS since this is a simple programming challenge in Vanilla JS. In real-world apps, I prefer to build in internationalization capability from the start. (The Intl JS library, Format.js, and react-intl all do a good job of this.) It's much easier to pay attention to internationalization concerns from the start than it is to retrofit after the fact. However, for this particular project, that's just extra work.

Deployment
==========

Originally I wanted to have the website be loadable directly from the filesystem, simply by clicking index.html. Unfortunately, I couldn't figure out a way to load external JSON files from the filesystem; `fetch` and `XMLHttpRequest` have issues with CORS that prevent it. 

I had a choice:
* Recode the app to use inline static JSON data (either in the HTML via `<script>` tags, or just writing it into the JavaScript.
* Recode the data to be JavaScript instead of JSON and load it via `<script>` tags.
* Insist that the page be loaded over a real HTTP server, and do `fetch` requests.

I chose the last as it's most reflective of a real-world application. The app now comes with instructions for running a simple HTTP server.