describe("Absorb.GroceryCo.Checkout.Views.ReceiptItem", function() {
    beforeEach(function() {
        this.instance = new Absorb.GroceryCo.Checkout.Views.ReceiptItem();
    });

    describe("render()", function() {
        beforeEach(function() {
            this.quantity = 0;
            this.basketItem = {
                quantity: this.quantity
            };
            this.render = () => {
                this.result = this.instance.render(this.basketItem);
            };
        });

        describe("when there is a preexisting element", function() {
            beforeEach(function() {
                this.$preexisting = document.createElement("div");
                this.$child = document.createElement("div");
                this.$preexisting.appendChild(this.$child);
                this.instance.$el = this.$preexisting;
                this.render();
            });

            it("removes the child elements", function() {
                expect(this.$preexisting.firstChild).toBeNull();
            });
        });

        describe("when there is no preexisting element", function() {
            beforeEach(function() {
                this.render();
            });

            describe("the container element", function() {
                beforeEach(function() {
                    this.subject = this.instance.$el;
                });

                it("is a div", function() {
                    expect(this.subject).toHaveTagName("div");
                });

                it("has the receipt-item class", function() {
                    expect(this.subject).toHaveCssClass("receipt-item");
                });
            });
        });

        describe("regardless of a preexisting element", function() {
            describe("when the quantity is zero", function() {
                beforeEach(function() {
                    this.quantity = 0;
                    this.basketItem = {
                        quantity: this.quantity
                    };
                    this.render();
                });

                describe("the container element", function() {
                    beforeEach(function() {
                        this.subject = this.result;
                    });
                    it("has none class", function() {
                        expect(this.subject).toHaveCssClass("none"));
                    });
                    it("has no children", function() {
                        expect(this.subject.firstChild).toBeNull();
                    });
                });
            });

            describe("when the quantity is nonzero", function() {
                beforeEach(function() {
                    this.quantity = 1;
                    this.basketItem = {
                        quantity: this.quantity
                    };
                    spyOn(this.instance, "renderRegularItem");
                    spyOn(this.instance, "renderPromotion");
                    this.render();
                });
                describe("the container element", function() {
                    beforeEach(function() {
                        this.subject = this.result;
                    });
                    it("does not have the none class", function() {
                        expect(this.subject).not.toHaveCssClass("none");
                    });
                    it("renders the item info to the container", function() {
                        expect(this.instance.renderRegularItem).toHaveBeenCalledWith(
                            this.instance.$el,
                            this.basketItem
                        );
                    });
                    it("renders the promotion info to the container", function() {
                        expect(this.instance.renderPromotion).toHaveBeenCalledWith(
                            this.instance.$el,
                            this.basketItem
                        );
                    });
                });
            });
        });
    });
});