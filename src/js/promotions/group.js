Absorb.GroceryCo.Checkout.Promotions.Group = class {
    constructor(id, quantity, price) {
        this.id = id;
        this.quantity = quantity;
        this.price = price;
    }

    calculateDiscount(quantity, price) {
        if (quantity >= this.quantity) {
            const regularPriceOfPromotionQuantity = this.quantity * price;
            const discount = regularPriceOfPromotionQuantity - this.price;
            return discount;
        }
        return null;
    }

    describe() {
        const value = Absorb.GroceryCo.Checkout.formatPrice(this.price);
        return `${this.quantity} for ${value}`;
    }
};
