Absorb.GroceryCo.Checkout.Notifications = class {
    static add(notification) {
        const $notifications = document.getElementById("notifications");
        if ($notifications) {
            const $notification = notification.render();
            $notifications.appendChild($notification);
        }
    }
}