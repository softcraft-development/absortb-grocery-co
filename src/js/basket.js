Absorb.GroceryCo.Checkout.Basket = class {
    constructor() {
        this.items = [];
    }

    createPromotion(promotionData) {
        switch (promotionData.type) {
            case "sale":
                return new Absorb.GroceryCo.Checkout.Promotions.Sale(
                    promotionData.id,
                    promotionData.price
                );
            case "group":
                return new Absorb.GroceryCo.Checkout.Promotions.Group(
                    promotionData.id,
                    promotionData.quantity,
                    promotionData.price
                );
            case "additionalProduct":
                return new Absorb.GroceryCo.Checkout.Promotions.AdditionalProduct(
                    promotionData.id,
                    promotionData.quantity,
                    promotionData.discount
                );
            default:
                // Another potential for discrepancy between server and client. What if
                // the server returns a promotion type that's not defined on the client?
                // Does that mean the server is broken, or is the client out of date?
                // That's a bigger question than we're prepared to deal with for this app;
                // for now I'll just ignore the promotion entirely.
                return null;
        }
    }

    load(inventoryData, promotionsData, basketData) {
        const productDataById = inventoryData.products.reduce((map, productData) => {
            map[productData.id] = productData;
            return map;
        }, {});

        promotionsData.promotions.reduce((map, promotionData) => {
            const productData = map[promotionData.productId];
            if (productData) {
                // How much should the client care about problems caused by the server?
                // For example, if promotions.json includes a promotion for a product
                // that doesn't exist in inventory.json, then there's some sort of 
                // odd data inconsistency going on somewhere.
                //
                // How should the client handle this? Well, it definitely shouldn't 
                // merely break (ie: throw an unhandled exception such as 
                // "Cannot read property 'promotions' of productData"). So we'd better
                // be guarding against the possibility of a non-existent product
                // (either through a conditional like I have done here, or possibly through
                // default values).
                //
                // In this case, it's pretty reasonable to ignore the problematic condition.
                // Without a product, a promotion is pretty useless, so we might as well 
                // just skip over it. 
                // 
                // But should we inform the user? For instance, should we add an "else"
                // clause to the above if and then log an error/warning message?
                // In cases like these, I say no, because the user can't do anything 
                // to resolve the condition themselves; this is entirely a problem in the 
                // data (and ultimately a problem with the server's data validation), so 
                // pestering the user with error message will just be annoying.
                // 
                // We might make the argument that we should send an error message
                // (invisble to the user) from the client back to the server, so that
                // developers / admins will see the error and take steps to fix it. 
                // This assumes that there's a mechanism for reporting client-side 
                // error messages on the server -- and that people are actually paying
                // attention to it.
                //
                // Since we have no server for this app, there's not much value in 
                // creating a (dummy) reporting mechanism. (And we control the data anyway
                // so there's little risk of it being an issue in the first place.) Thus, I'm 
                // choosing to silently ignore data issues like this on the client. 
                // 
                // In general though, I prefer to avoid silent error conditions, so I'd consider
                // raising a fuss here.
                if (!productData.promotions) {
                    productData.promotions = [];
                }
                const promotion = this.createPromotion(promotionData);
                if (promotion) {
                    productData.promotions.push(promotion);
                }
            }
            return map;
        }, productDataById);

        this.items = basketData.basket.reduce((array, basketItemData) => {
            const product = productDataById[basketItemData.productId];
            if (product) {
                const basketItem = new Absorb.GroceryCo.Checkout.BasketItem(
                    product.id,
                    product.name,
                    product.price,
                    product.promotions,
                    basketItemData.quantity,
                    product.quantity
                );
                array.push(basketItem);
            }
            return array;
        }, []);

        this.items = this.items.sort((a, b) => {
            var result = a.name.localeCompare(b.name);
            if (result === 0) {
                // Tie-breaker
                return a.id.localeCompare(b.id);
            }
            return result;
        });
    }

    subtotal() {
        return this.items.reduce((total, item) => {
            if (item.subtotal == null) {
                return total;
            }
            return total + item.subtotal;
        }, 0);
    }

    discount() {
        return this.items.reduce((discount, item) => {
            if (item.appliedPromotion == null) {
                return discount;
            }
            return discount + item.appliedPromotion.discount;
        }, 0);
    }
};
