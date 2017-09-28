Absorb.GroceryCo.Checkout.Views.ReceiptItem = class {
    constructor() {
    }

    render(basketItem) {
        // All of this manual DOM checking and manipulateion is why it's nice
        // to have React handle it (virtually) for you.
        // Recreating everything isn't as efficient, but it is simple, 
        // and that's good enough for this app
        if (this.$el) {
            while (this.$el.lastChild) {
                this.$el.removeChild(this.$el.lastChild);
            }
        } else {
            this.$el = document.createElement("div");
            this.$el.classList.add("receipt-item", "vm05");
        }
        if (basketItem.validQuantity()) {
            this.$el.classList.remove("none");
            this.renderRegularItem(this.$el, basketItem);
            this.renderPromotion(this.$el, basketItem);
        } else {
            this.$el.classList.add("none");
        }
        return this.$el;
    }

    renderDiscount($container, discount) {
        const $discount = document.createElement("div");
        $container.appendChild($discount);
        $discount.classList.add("discount");
        $discount.innerText = Absorb.GroceryCo.Checkout.formatPrice(-discount);
    }

    renderName($container, name) {
        const $name = document.createElement("div");
        $container.appendChild($name);
        $name.classList.add("name");
        $name.innerText = name;
    }

    renderPromotion($container, basketItem) {
        if (basketItem.appliedPromotion != null) {
            const $promotion = document.createElement("div");
            $container.appendChild($promotion);
            $promotion.classList.add("promotion", "receipt-line");

            this.renderPromotionName($promotion);
            this.renderPromotionDescription($promotion, basketItem.appliedPromotion.promotion);
            this.renderDiscount($promotion, basketItem.appliedPromotion.discount);
        }
    }

    renderPromotionDescription($container, promotion) {
        const $description = document.createElement("div");
        $container.appendChild($description);
        $description.classList.add("description");
        $description.innerText = promotion.describe();
    }

    renderPromotionName($container) {
        const $name = document.createElement("div");
        $container.appendChild($name);
        $name.classList.add("name");
        $name.innerText = "Promo";
    }

    renderRegularItem($container, basketItem) {
        const $regularItem = document.createElement("div");
        $container.appendChild($regularItem);
        $regularItem.classList.add("regular", "receipt-line");

        this.renderName($regularItem, basketItem.name);
        this.renderRegularPrice($regularItem, basketItem.price, basketItem.quantity);
        this.renderRegularTotal($regularItem, basketItem.subtotal);
    }

    renderRegularPrice($container, price, quantity) {
        const $price = document.createElement("div");
        $container.appendChild($price);
        $price.classList.add("price");
        // string templates are nice, but for long & complex
        // string building like this, I prefer concatenation of multiple lines.
        var descriptor = "@ ";
        descriptor += Absorb.GroceryCo.Checkout.formatPrice(price);
        descriptor += " x ";
        descriptor += quantity.toLocaleString();
        $price.innerText = descriptor;
    }

    renderRegularTotal($container, total) {
        const $total = document.createElement("div");
        $container.appendChild($total);
        $total.classList.add("total");
        $total.innerText = Absorb.GroceryCo.Checkout.formatPrice(total);
    }
};
