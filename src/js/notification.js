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
            this.$el.classList.add("notification", this.className);

            var $message = document.createElement("span");
            this.$el.appendChild($message);
            $message.classList.add("message");
            $message.innerText = this.message;

            var $dismiss = document.createElement("button");
            this.$el.appendChild($dismiss);
            $dismiss.setAttribute("type", "button");
            $dismiss.classList.add("dismiss");
            $dismiss.innerText = "Dismiss";
            $dismiss.addEventListener("click", this.onDismiss.bind(this));
        }

        return this.$el;
    }
};