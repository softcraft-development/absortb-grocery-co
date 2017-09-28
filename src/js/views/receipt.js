Absorb.GroceryCo.Checkout.Views.Receipt = class {
    constructor(basket) {
        this.basket = basket;
    }

    render() {
        if (!this.$el) {
            this.$el = document.createElement("div");
            this.$el.classList.add("receipt");

            this.basket.items.reduce(($container, basketItem) => {
                const receiptItem = new Absorb.GroceryCo.Checkout.Views.ReceiptItem();
                const $itemEl = receiptItem.render(basketItem);
                basketItem.addQuantityListener((updated) => {
                    receiptItem.render(updated);
                    this.updateTotals();
                });
                $container.appendChild($itemEl);
                return $container;
            }, this.$el);
            this.renderTotals(this.$el);
        }
        return this.$el;
    }

    renderDiscount($container) {
        const $line = document.createElement("div");
        $container.appendChild($line);
        $line.classList.add("discount");
    }

    renderTotalLine($container, className, name) {
        const $line = document.createElement("div");
        $container.appendChild($line);
        $line.classList.add(className, "receipt-line");

        const $name = document.createElement("div");
        $line.appendChild($name);
        $name.classList.add("name");
        $name.innerText = name;

        const $value = document.createElement("div");
        $line.appendChild($value);
        $value.classList.add("total");
        return $value;
    }

    renderTotals($container) {
        const $totals = document.createElement("div");
        $container.appendChild($totals);
        $totals.classList.add("totals", "vm2", "receipt-item");

        

        this.$subtotal = this.renderTotalLine($totals, "subtotal", "Subtotal:");
        this.$discount = this.renderTotalLine($totals, "discount", "Discount:");
        this.$grandTotal= this.renderTotalLine($totals, "grand-total", "Total:");
    }

    updateTotals(){
        const subtotal = this.basket.subtotal();
        const discount = this.basket.discount();
        const grandTotal = subtotal - discount;

        this.$subtotal.innerText = Absorb.GroceryCo.Checkout.formatPrice(subtotal);
        this.$discount.innerText = Absorb.GroceryCo.Checkout.formatPrice(-discount);
        this.$grandTotal.innerText = Absorb.GroceryCo.Checkout.formatPrice(grandTotal);
    }
};
