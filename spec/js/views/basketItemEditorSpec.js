describe("Absorb.GroceryCo.Checkout.Views.BasketItemEditor", function() {
    beforeEach(function() {
        this.$container = document.createElement("div");
        this.id = "test-basket-item-id";
        this.name = "Test Name";
        this.price = 3;
        this.quantity = 5;
        this.inventory = 7;
        this.instantiate = () => {
            this.basketItem = new Absorb.GroceryCo.Checkout.BasketItem(
                this.id,
                this.name,
                this.price,
                this.promotions,
                this.quantity,
                this.inventory
            );
            this.instance = new Absorb.GroceryCo.Checkout.Views.BasketItemEditor(this.basketItem);
        };
    });

    describe("updateQuantity", function() {
        beforeEach(function() {
            this.updateQuantity = () => {
                this.instantiate();
                this.instance.render(this.$container);
                this.instance.updateQuantity(this.basketItem);
            };
        });

        function addEnabled() {
            it("enables the add button", function() {
                expect(this.instance.$add.getAttribute("disabled")).toBeFalsy();
            });
        }

        function addDisabled() {
            it("disables the add button", function() {
                expect(this.instance.$add.getAttribute("disabled")).toBeTruthy();
            });
        }

        function removeEnabled() {
            it("enables the remove button", function() {
                expect(this.instance.$remove.getAttribute("disabled")).toBeFalsy();
            });
        }

        function removeDisabled() {
            it("disables the remove button", function() {
                expect(this.instance.$remove.getAttribute("disabled")).toBeTruthy();
            });
        }

        function messageEmpty() {
            it("clears the validation message", function() {
                expect(this.instance.$message.innerText).toEqual("");
            });
        }

        describe("when the quantity is null", function() {
            beforeEach(function() {
                this.quantity = null;
                this.updateQuantity();
            });
            addEnabled();
            removeDisabled();

        });

        describe("when the quantity is zero", function() {
            beforeEach(function() {
                this.quantity = 0;
                this.updateQuantity();
            });
            addEnabled();
            removeDisabled();
            messageEmpty();
        });

        describe("when the qantity is greater than zero and less than the inventory", function() {
            beforeEach(function() {
                this.quantity = 1;
                this.inventory = 3;
                this.updateQuantity();
            });
            addEnabled();
            removeEnabled();
            messageEmpty();
        });

        describe("when the qantity is at the inventory", function() {
            beforeEach(function() {
                this.quantity = this.inventory;
                this.updateQuantity();
            });
            addDisabled();
            removeEnabled();
            messageEmpty();
        });
    });
});