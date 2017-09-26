Absorb.GroceryCo.Checkout.Promotions.Sale = class {
    constructor(id, price) {
        this.id = id;
        this.price = price;
    }

    // eslint-disable-next-line no-unused-vars
    expectedPrice(quantity, price) {
        return quantity * this.price;
    }
};
