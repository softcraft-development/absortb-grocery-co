Absorb.GroceryCo.Checkout.formatPrice = function(price) {
    // Note that the currency would likely be dynamically determined in
    // a real-world app.
    return price.toLocaleString(navigator.language, {
        style: "currency",
        currency: "CAD",
        minimumFractionDigits: 2
    });
};
