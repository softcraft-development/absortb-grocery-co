Absorb.GroceryCo.Checkout.Promotions.Group = class {
    constructor(id, quantity, price) {
        this.id = id;
        this.quantity = quantity;
        this.price = price;
    }

    expectedPrice(quantity, price) {
        if (quantity >= this.quantity) {
            const leftovers = quantity - this.quantity;
            return this.price + (leftovers * price);
        }
        return quantity * price;
    }
};
