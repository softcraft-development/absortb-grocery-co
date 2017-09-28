Absorb.GroceryCo.Checkout.Views.BasketItemEditor = class {
    constructor(basketItem) {
        this.basketItem = basketItem;
        basketItem.addQuantityListener(this.updateQuantity.bind(this));
    }

    onAdd(event) {
        event.preventDefault();
        this.basketItem.quantity = this.basketItem.quantity + 1;
    }

    onQuantityEdited() {
        const newQuantity = this.validateQuantity(newQuantity);
        if (newQuantity != null) {
            this.basketItem.quantity = newQuantity;
        }
    }

    onRemove(event) {
        event.preventDefault();
        this.basketItem.quantity = this.basketItem.quantity - 1;
    }

    render() {
        if (!this.$el) {
            this.$el = document.createElement("div");
            this.$el.classList.add("basket-item", "vm05");

            this.renderControls(this.$el);
            this.renderMessage(this.$el);
            this.validateQuantity(this.basketItem.quantity);
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
        this.updateQuantity(this.basketItem);
        this.$quantity.addEventListener("change", this.onQuantityEdited);
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
        this.$message.innerHTML(message);
    }

    // Validation is another aspect of UI development where it really helps to have
    // a good library/framework. For this app it's acceptable to just constrain it
    // to one method with several checks & static messages; in a larger app this
    // wouldn't cut it.
    //
    // Note that we'd probably want to separate out validation from display, and also
    // probably from state management as well. However, for this app, I'm going to tie 
    // validation to the view. It starts by taking a string value off of the field 
    // and (potentially) ends by injecting a message into a display element; both of
    // these are view concerns. In addition, the add/remove buttons are enabled or disabled
    // based on the validation results. There's not much value to be gained here by
    // moving the middle part out to some other class arbitrarily.
    validateQuantity(value) {
        // It's not explicitly stated anywhere in the specs whether we are allowing
        // fractional quantities. It's implied via the given examples and the add/remove
        // buttons that quantities should be discrete/integers. However, it's not
        // good to assume that (the quantities for fruit could very well be weights
        // after all). This would require some clarification of the specs. In the meantime,
        // I'm going to assume fractional quantities are fine; that makes for
        // simpler code as I don't have to try to detect & handle unaccepted decimal values.
        const quantity = Number.parseFloat(value);
        if (Number.isNaN(quantity)) {
            this.setMessage("Quantity must be a valid number.");
            this.$add.setAttribute("disabled", "disabled");
            this.$remove.setAttribute("disabled", "disabled");
            return null;
        }

        if (quantity >= this.basketItem.inventory) {
            this.$add.setAttribute("disabled", "disabled");
        }
        else {
            this.$add.removeAttribute("disabled");
        }

        if (quantity <= 0) {
            this.$remove.setAttribute("disabled", "disabled");
        }
        else {
            this.$remove.removeAttribute("disabled");
        }

        if (quantity < 0) {
            this.setMessage("Quantity must be greater than 0.");
            return null;
        }

        if (quantity > this.basketItem.inventory) {
            this.setMessage(`Quantity must be less than ${this.basketItem.inventory}.`);
            return null;
        }

        return quantity;
    }

    updateQuantity(updatedBasketItem) {
        this.$quantity.setAttribute("value", updatedBasketItem.quantity);
    }
};
