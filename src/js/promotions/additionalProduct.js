Absorb.GroceryCo.Checkout.Promotions.AdditionalProduct = class {
    constructor(id, quantity, discount) {
        this.id = id;
        this.quantity = quantity;
        this.discount = discount;
    }

    expectedPrice(quantity, price) {
        var discount = 0;
        if (quantity > this.quantity) {
            discount = this.discount * price;
        }
        return (quantity * price) - discount;
    }
};
