Absorb.GroceryCo.Checkout.Views.BasketItemEditor = class {
    constructor(basketItem) {
        this.basketItem = basketItem;
        this.basketItem.addQuantityListener(this.updateQuantity.bind(this));
    }

    onAdd(event) {
        event.preventDefault();
        this.basketItem.quantity = (this.basketItem.quantity || 0) + 1;
    }

    onQuantityEdited(event) {
        const raw = event.target.value.trim();
        const quantity = Number.parseFloat(raw);
        if (Number.isNaN(quantity)) {
            this.setMessage("Quantity must be a valid number.");
            this.basketItem.quantity = null;
            return;
        }

        this.basketItem.quantity = quantity;
    }

    onRemove(event) {
        event.preventDefault();
        this.basketItem.quantity = (this.basketItem.quantity || 0) - 1;
    }

    render() {
        if (!this.$el) {
            this.$el = document.createElement("div");
            this.$el.classList.add("basket-item", "vm05");

            this.renderControls(this.$el);
            this.renderMessage(this.$el);
            this.updateQuantity(this.basketItem);
        }
        return this.$el;
    }

    renderAdd($container) {
        this.$add = document.createElement("button");
        $container.appendChild(this.$add);
        this.$add.setAttribute("type", "button");
        this.$add.classList.add("add");
        this.$add.innerText = "Add";
        this.$add.addEventListener("click", this.onAdd.bind(this));
    }

    renderButtons($container) {
        const $buttons = document.createElement("div");
        $container.appendChild($buttons);
        $buttons.classList.add("buttons");

        this.renderAdd($buttons);
        this.renderRemove($buttons);
    }

    renderControls($container) {
        const $controls = document.createElement("div");
        $container.appendChild($controls);
        $controls.classList.add("controls");

        this.renderName($controls);
        this.renderQuantity($controls);
        this.renderButtons($controls);
    }

    renderMessage($container) {
        this.$message = document.createElement("div");
        $container.appendChild(this.$message);
        this.$message.classList.add("message");
    }

    renderName($container) {
        const $name = document.createElement("div");
        $container.appendChild($name);
        $name.classList.add("name");
        $name.innerText = this.basketItem.name;
    }

    renderQuantity($container) {
        this.$quantity = document.createElement("input");
        $container.appendChild(this.$quantity);
        this.$quantity.classList.add("quantity");
        this.$quantity.setAttribute("name", "quantity");
        this.$quantity.setAttribute("type", "number");
        this.$quantity.setAttribute("min", "0");
        this.$quantity.setAttribute("max", this.basketItem.inventory);
        this.$quantity.addEventListener("input", this.onQuantityEdited.bind(this));
    }

    renderRemove($container) {
        this.$remove = document.createElement("button");
        $container.appendChild(this.$remove);
        this.$remove.setAttribute("type", "button");
        this.$remove.classList.add("remove");
        this.$remove.innerText = "Remove";
        this.$remove.addEventListener("click", this.onRemove.bind(this));
    }

    setMessage(message) {
        this.$message.innerHTML = message;
    }

    updateQuantity(basketItem) {
        const quantity = basketItem.quantity;
        if ( quantity != null ) {
            this.$quantity.value = String(quantity);
            this.setMessage("");
        }

        if (quantity >= basketItem.inventory) {
            this.$add.setAttribute("disabled", "disabled");
        }
        else {
            this.$add.removeAttribute("disabled");
        }

        if ((quantity || 0) <= 0) {
            this.$remove.setAttribute("disabled", "disabled");
        }
        else {
            this.$remove.removeAttribute("disabled");
        }

        if ((quantity || 0) < 0) {
            this.setMessage("Quantity must be greater than 0.");
            return;
        }

        if (quantity > this.basketItem.inventory) {
            this.setMessage(`Quantity must be less than ${this.basketItem.inventory}.`);
            return;
        }
    }
};
