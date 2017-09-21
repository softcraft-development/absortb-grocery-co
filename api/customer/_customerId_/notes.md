Notes on the Customer Basket
----------------------------

See also: /api/notes.md for some discussion on "Basket" vs "Inventory".

Route Cardinality
=================

For the moment, we're assuming that a user has exactly one "basket", as that's implied by the specs. That means that the route is /customer/\_customerId\_/basket. Rails calls this a "singleton" route, since it's accessing a single resource without a unique identifier. 

If there was more than one basket, the route would be /customer/\_customerId\_/basket/\_basketId\_. We still have the option to change to that at a later date.

