Absorb.GroceryCo.Checkout.BasketItem = class {
    constructor(id, price, promotions, quantity) {
        this.id = id;
        this.price = price;
        this.promotions = promotions || [];
        this.quantity = quantity || 0;
    }

    appliedPromotion() {
        const best = this.promotions.reduce((contender, promotion) => {
            const discount = promotion.calculateDiscount(this.quantity, this.price);

            // Normally I prefer _.isNil and strict (in)equality checks.
            // But I'm not using lodash, so instead I'll rely on JS
            // to treat undefined == null using !=.
            if (discount != null) {
                // Note the nested ifs. This is technically unnecessary, as
                // with enough parenthesis and boolean operators I could
                // make this all one conditional. I find this style
                // *much* easier to follow however.
                if (contender == null
                    || discount > contender.discount) {
                    return {
                        promotion,
                        discount
                    };
                }
            }
            return contender;
        }, null);
        return best;
    }

    subtotal() {
        return this.price * this.quantity;
    }
};
