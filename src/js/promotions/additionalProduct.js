Absorb.GroceryCo.Checkout.Promotions.AdditionalProduct = class {
    constructor(id, quantity, discount) {
        this.id = id;
        this.quantity = quantity;
        this.discount = discount;
    }

    calculateDiscount(quantity, price) {
        if (quantity > this.quantity) {
            return this.discount * price;
        }
        return null;
    }
};
