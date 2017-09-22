Display
=======

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
