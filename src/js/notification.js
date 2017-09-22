Absorb.GroceryCo.Checkout.Notification = class {
    constructor(message, className) {
        this.message = message;
        this.className = className;
    }

    onDismiss(event) {
        if (event) {
            event.preventDefault();
        }

        if (this.$el) {
            this.$el.remove();
            this.$el = null;
        }
    }

    render() {
        if (!this.$el) {
            this.$el = document.createElement("div");
            this.$el.className = 'notification ' + this.className;

            var $message = document.createElement("span");
            this.$el.appendChild($message);
            $message.className = "message";
            $message.innerText = this.message;

            var $dismiss = document.createElement("button");
            this.$el.appendChild($dismiss);
            $dismiss.setAttribute("type", "button");
            $dismiss.className = 'dismiss';
            $dismiss.innerText = "Dismiss";
            $dismiss.onclick = this.onDismiss;
        }

        return this.$el;
    }
}