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

    describe() {
        var deal;
        if (this.discount === 1) {
            deal = "FREE";
        } else {
            const value = this.discount.toLocaleString(navigator.language, {
                style: "percent"
            });
            deal = `@ ${value} off`;
        }
        return `Buy ${this.quantity} Get 1 ${deal}`;
    }
};
