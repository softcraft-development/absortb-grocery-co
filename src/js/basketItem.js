Absorb.GroceryCo.Checkout.BasketItem = class {
    constructor(id, name, price, promotions, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.promotions = promotions || [];
        this.quantityListeners = [];

        var _quantity = quantity;

        // Quantity is the only place in the app where the state changes.
        // I need a way to reflect state changes in the UI representation.
        // Doing this manual subscriber model on a single property is crude, but effective enough.
        // In a real-world app, I definitely wouldn't try to do it this way, as it'd be a lot
        // of extra work. There's much better options available (React/Redux, or even)
        // Backbone's models with their own event system. However, none of them are 
        // "Vanilla" JS, and so not really applicable for this app.
        Object.defineProperty(this, "quantity", {
            get: () => {
                return _quantity;
            },
            set: (value) => {
                _quantity = value;
                this.quantityListeners.forEach((listener) => {
                    listener(this);
                });
            }
        });
        this.quantity = quantity || 0;

    }

    addQuantityListener(listener) {
        this.quantityListeners.push(listener);
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
