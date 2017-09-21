Notes on the Customer Basket
----------------------------

Route Cardinality
=================

For the moment, we're assuming that a user has exactly one "basket", as that's implied by the specs. That means that the route is /customer/\_customerId\_/basket. Rails calls this a "singleton" route, since it's accessing a single resource without a unique identifier. 

If there was more than one basket, the route would be /customer/\_customerId\_/basket/\_basketId\_. We still have the option to change to that at a later date.

"Basket" vs "Inventory"
=======================

This is a bit confusing:

    The application should include static data (e.g. JSON) containing an unsorted list of items which represent products from a customer’s initial basket state scanned at the kiosk. The kiosk has a limited inventory of products available, so the number of items in the customer’s basket cannot exceed that number at any time... The checkout process should be able to accept the same item multiple times and in any order. For example, an Apple might be scanned, followed by two Oranges, and then an Apple again.

So in common parlance, the "inventory" is everything that the store has to sell; typically, this includes both "item types" and "quantities" (especially when selling multiple instances of otherwise identical items). The "basket" is what the customer has selected to buy prior to checkout.

What's confusing me is this statement: 

    The kiosk has a limited inventory of products available, so the number of items in the customer’s basket cannot exceed that number at any time

I believe the intent here is that the total instances of items in the basket cannot exceed the total instances of products in the entire inventory. I.e.: you cannot buy more than the store contains.

However, a real-world app would never bother to check the total number of items in the basket vs the total number of items in the inventory. If it's trying to avoid data faults via over-buys, then it needs to check the quantity of each item in the basket against the quantity of the corresponding item in the inventory.

Stated another way: if the inventory has 5 apples and 2 bananas (7 items total), it's incorrect for the basket to have 3 bannas in it. 3 is less than the entire inventory of 7 items, but it's greater than the number of bananas at 2.

I *believe* this is the intent of the coding exercise. However, it's not 100% clear, and is something I'd go back to the spec writer with to confirm.

Part of the confusion comes from the initial line:

    The application should include static data (e.g. JSON) containing an unsorted list of items which represent products from a customer’s initial basket state scanned at the kiosk.

So we're talking about a JSON data source for the basket state, but so far have not discussed one for the inventory state. We need the both in order to run the quantity validation rule discussed.

