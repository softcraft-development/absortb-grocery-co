Absorb.GroceryCo.Checkout.Promotions.Sale = class {
    constructor(id, price) {
        this.id = id;
        this.price = price;
    }

    calculateDiscount(quantity, price) {
        var discountPerItem = price - this.price;
        return quantity * discountPerItem;
    }
};
