Absorb.GroceryCo.Checkout.ErrorHandling = class {
    static log(reason){
        console.error(reason);

        const notification = new Absorb.GroceryCo.Checkout.Notification(String(reason), "error");
        Absorb.GroceryCo.Checkout.Notifications.add(notification);
    }
};
