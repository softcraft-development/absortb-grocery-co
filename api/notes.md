API Folder Notes
----------------

This is where the JSON data files are going to live. A real-world UI would most likely be getting this from the server API, so we might as well call this directory "api", and treat it as if it's a server endpoint (as much as we can while still using a filesystem).

I generally try to use RESTful APIs in my applications. GraphQL looks like an interesting alternative, as it solves some of the ambiguity in straight REST for some common circumstances. Facebook has to figure out the patent issues in the license first though.

 I'll fake a typical dynamic RESTful path through directories. So, for example, the (relative) path to the customer initial basket state will be /customer/\_customerid\_/basket. Anything with \_underscores\_ indicates a dynamic path element. (In an ideal real-world app, this would be replaced with a  unique, unchanging, human-friendly & URL-compatible text slug.)

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

"Inventory" vs "Catalog"
========================

There's two terms here, which could mean different things, but in this case, probably do not.

So we know that there's some notion of a "product type"; instances of these are "Apple" and "Banana". These in turn have a defined price.

Since we're talking about a grocery store, instances of these product types are more than likely indistinguishable. When we sell an apple, we don't care *which* apple we sell; just that a *quantity* of apples was sold.

So, the "inventory" for the store might look like this:

    { 
        products: [
            name: "apple"
            price: 0.98
            quantity: 31
        ]
    }

In this case, there's no need for the term "Catalog", and so it should probably be replaced to avoid confusion/ambiguity.

This isn't necessarily the case for all apps. If you were selling cars for instance, each instance has some relevant properties that need tracking. (ex: VIN). In this case, you might have a "Catalog" that tracks which *types* of products are available, and an "Inventory" which tracks the individual cases of each product type. In this case, "quanity" wouldn't be a stored property (in a normalized system), but a calculated one.

JSON Envelopes
==============

Although this is a topic of some debate, I prefer to wrap my JSON data structures in an "envelope" of a named property -- even if there's only a single property in the entire response body. This is for future extensibility; it's really easy to add different types of data into the response down the road when they're each identified by unique property names. 

So for example, in inventory.json, I have:

    { products: [ "apple", "banana"  ] }

We could technically drop the envelope and just return the product array:

    { [ "apple", "banana" ] }

However, if we need to add in more data of a differen type, we *must* include the envelope so that we can differentiate between the two data sets with property names:

    { products: ["apple", "banana"], promotions: [{productId: "banana", discount: 0.1}] }

If we didn't already have the envelope, we'd have to recode the part that handles the response. If we have it from the start, then we just have to deal with (or ignore) an additional property.

This is especially important when using a Redux-based front-end, where the data needs to be normalized (and, in practice, flattened). It's really convenient when the Redux state can correspond 1:1 with the API responses (which in turn often correspond 1:1 with the database tables anyway). 

Object identifiers
==================

When I'm designing APIs and front-ends, I like to make sure that I use arbitrary strings as identifiers (possibly to the point of converting numeric IDs from an API I don't control into strings for storage client-side).

My rationale is this:
* Strings can hold anything, even "numbers". They're future-proof.
* Strings can be human-friendly / descriptive. Numbers usually aren't.
* Strings can be made to be hard to guess, if appropriate. 
  * Numbers can too, but they often *aren't*. All too often, devs will just stick an auto-increment Primary Key on a table and then use that as the unique identifier everywhere in the system. This introduces two security risks:
    * Hackers can guess IDs, and thus probe for information based on that ID. (Hopefully you're not relying on ID obscurity for your security, but you don't have to make it easy for anyone.)
    * Incremental IDs do leak (possibly sensitive) information about the *quantity* of the given resource that's present in the system. (Ex: I know your minimum user count if I can see my own incremental user ID.)
* Strings aren't as apt to run out of address space.

I show some examples of this in inventory.json

promotions.json
===============

Lots of potential for functional enhancement here, but I'm keeping it simple until otherwise required.

* We'll assume that each promotion is a fixed-price-per-item, not a percentage discount, buy X get Y free, etc.
* We'll assume that there's only 1 promotion per product, although the data structure doesn't require this to be true. Multiple promotions per product don't really make sense when they're just price adjustments.
