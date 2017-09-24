Absorb.GroceryCo.Checkout.Notifications = class {
    static add(notification) {
        const $notifications = document.getElementById("notifications");
        const $notification = notification.render();
        $notifications.appendChild($notification);
    }
};
