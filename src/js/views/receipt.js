Absorb.GroceryCo.Checkout.Views.Receipt = class {
    constructor(basketItems) {
        this.basketItems = basketItems;
    }

    render() {
        if (!this.$el) {
            this.$el = document.createElement("div");
            this.$el.classList.add("receipt");

            this.basketItems.reduce(($container, basketItem) => {
                const receiptItem = new Absorb.GroceryCo.Checkout.Views.ReceiptItem();
                const $itemEl = receiptItem.render(basketItem);
                basketItem.addQuantityListener((updated)=>{
                    receiptItem.render(updated);
                });
                $container.appendChild($itemEl);
                return $container;
            }, this.$el);
        }
        return this.$el;
    }
};
