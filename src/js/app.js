Absorb.GroceryCo.Checkout.Application = {
    inititialize() {
        const inventoryPromise = Absorb.GroceryCo.Checkout.loadJson("../api/inventory.json");
        const promotionsPromise = Absorb.GroceryCo.Checkout.loadJson("../api/promotions.json");
        const basketPromise = Absorb.GroceryCo.Checkout.loadJson("../api/customer/_customerId_/basket.json");

        Promise.all([inventoryPromise, promotionsPromise, basketPromise])
            .then(([inventoryData, promotionsData, basketData]) => {
                const basket = new Absorb.GroceryCo.Checkout.Basket();
                basket.load(inventoryData, promotionsData, basketData);
                
                const $form = document.getElementById("basket-form");
                basket.items.forEach((basketItem)=>{
                    const view = new Absorb.GroceryCo.Checkout.Views.BasketItemEditor(basketItem);
                    $form.appendChild(view.render());
                });
                
                const $container = document.getElementById("receipt-display");
                const receipt = new Absorb.GroceryCo.Checkout.Views.Receipt(basket);
                $container.appendChild(receipt.render());
            });
    }
};

document.addEventListener("DOMContentLoaded", function() {
    Absorb.GroceryCo.Checkout.Application.inititialize();
});