Absorb.GroceryCo.Checkout.BasketItem = class {
    constructor(id, name, price, promotions, quantity, inventory) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.promotions = promotions || [];
        this.quantityListeners = [];
        this.inventory = inventory;

        var _quantity;

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
            set: (raw) => {
                const result = this.validateQuantity(raw);
                _quantity = result.quantity;
                this.quantityListeners.forEach((listener) => {
                    listener(_quantity, raw);
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

    validateQuantity(raw) {
        // It's not explicitly stated anywhere in the specs whether we are allowing
        // fractional quantities. It's implied via the given examples and the add/remove
        // buttons that quantities should be discrete/integers. However, it's not
        // good to assume that (the quantities for fruit could very well be weights
        // after all). This would require some clarification of the specs. In the meantime,
        // I'm going to assume fractional quantities are fine; that makes for
        // simpler code as I don't have to try to detect & handle unaccepted decimal values.

        const result = {
            quantity: null,
            raw,
        };

        if (typeof raw === "number") {
            result.quantity = raw;
        } else {
            raw = String(raw).trim();
            result.quantity = Number.parseFloat(raw);
        }

        return result;
    }
};
