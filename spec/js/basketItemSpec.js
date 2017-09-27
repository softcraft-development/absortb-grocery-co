describe("Absorb.GroceryCo.Checkout.BasketItem", function() {
    beforeEach(function() {
        this.id = "test-basket-item-id";
        this.name = "Test Name";
        this.price = 3;
        this.quantity = 5;

        this.instantiate = () => {
            this.instance = new Absorb.GroceryCo.Checkout.BasketItem(
                this.id,
                this.name,
                this.price,
                this.promotions,
                this.quantity
            );
            return this.instance;
        };
    });

    describe("when instantiated", function() {
        beforeEach(function() {
            this.promotions = [];
            this.instantiate();
        });
        it("sets the id", function() {
            expect(this.instance.id).toEqual(this.id);
        });
        it("sets the name", function() {
            expect(this.instance.name).toEqual(this.name);
        });
        it("sets the price", function() {
            expect(this.instance.price).toEqual(this.price);
        });
        it("sets the promotions", function() {
            expect(this.instance.promotions).toBe(this.promotions);
        });
        it("sets the quantity", function() {
            expect(this.instance.quantity).toEqual(this.quantity);
        });
    });

    describe("appliedPromotion()", function() {
        function itAppliesNoPromotion() {
            it("returns a null applied promotion ", function() {
                expect(this.result).toBeNull();
            });
        }

        describe("when there are no promotions", function() {
            beforeEach(function() {
                this.promotions = null;
                this.instantiate();
                this.result = this.instance.appliedPromotion();
            });

            itAppliesNoPromotion();
        });

        describe("when there one promotion", function() {
            describe("that is applicable", function() {
                beforeEach(function() {
                    this.promotionDiscount = 7;
                    this.promotions = [
                        // This is one of the nicer features of JavaScript.
                        // No need to worry about metaprogramming,
                        // just create an object that obeys the contract
                        // and you're good to go.
                        // And we don't even have to obey the contract all that strictly.
                        {
                            calculateDiscount: () => {
                                return this.promotionDiscount;
                            }
                        }
                    ];
                    this.instantiate();
                    this.result = this.instance.appliedPromotion();
                });
                it("returns the promotion discount", function() {
                    expect(this.result).toEqual(jasmine.objectContaining({
                        discount: this.promotionDiscount
                    }));
                });
            });

            describe("that is not applicable", function() {
                beforeEach(function() {
                    this.promotions = [
                        {
                            calculateDiscount() {
                                return null;
                            }
                        }
                    ];
                    this.instantiate();
                    this.result = this.instance.appliedPromotion();
                });
                itAppliesNoPromotion();
            });
        });

        describe("when there are two promotions", function() {
            function itReturnsTheFirstDiscount() {
                it("returns the first promotion discount", function() {
                    expect(this.result).toEqual(jasmine.objectContaining({
                        discount: this.firstDiscount
                    }));
                });
            }
            function itReturnsTheSecondDiscount() {
                it("returns the first promotion discount", function() {
                    expect(this.result).toEqual(jasmine.objectContaining({
                        discount: this.secondDiscount
                    }));
                });
            }
            beforeEach(function() {
                this.createTwoPromotions = () => {
                    this.promotions = [
                        {
                            calculateDiscount: () => {
                                return this.firstDiscount;
                            }
                        },
                        {
                            calculateDiscount: () => {
                                return this.secondDiscount;
                            }
                        }
                    ];
                };
            });

            describe("and none are applicable", function() {
                beforeEach(function() {
                    this.firstDiscount = null;
                    this.secondDiscount = null;
                    this.createTwoPromotions();
                    this.instantiate();
                    this.result = this.instance.appliedPromotion();
                });
                itAppliesNoPromotion();
            });

            describe("and the first only is applicable", function() {
                beforeEach(function() {
                    this.firstDiscount = 11;
                    this.secondDiscount = null;
                    this.createTwoPromotions();
                    this.instantiate();
                    this.result = this.instance.appliedPromotion();
                });
                itReturnsTheFirstDiscount();
            });

            describe("and the second only is applicable", function() {
                beforeEach(function() {
                    this.firstDiscount = null;
                    this.secondDiscount = 13;
                    this.createTwoPromotions();
                    this.instantiate();
                    this.result = this.instance.appliedPromotion();
                });
                itReturnsTheSecondDiscount();
            });

            describe("and the first is better than the second", function() {
                beforeEach(function() {
                    this.firstDiscount = 19;
                    this.secondDiscount = 17;
                    this.createTwoPromotions();
                    this.instantiate();
                    this.result = this.instance.appliedPromotion();
                });
                itReturnsTheFirstDiscount();
            });
            describe("and the second is better than the first", function() {
                beforeEach(function() {
                    this.firstDiscount = 23;
                    this.secondDiscount = 29;
                    this.createTwoPromotions();
                    this.instantiate();
                    this.result = this.instance.appliedPromotion();
                });
                itReturnsTheSecondDiscount();
            });
        });
    });

    describe(".quantity", function() {
        beforeEach(function() {
            this.newQuantity = 31;
            this.instantiate();
            this.setQuantity = () => {
                this.result = this.instance.quantity = this.newQuantity;
            };
        });

        describe("when set", function() {
            describe("regardless of whether there's a listener added", function() {
                beforeEach(function() {
                    // When I add my own enhancements to Jasmine,
                    // I can write tests in such a way that everything
                    // is late-bound, regardless of the declaration order.
                    // These enhancements would make this sort of 
                    // odd describe() section unnecessary.
                    this.setQuantity();
                });

                it("updates the quantity", function() {
                    expect(this.instance.quantity).toEqual(this.newQuantity);
                });
            });

            describe("when there is a listener added", function() {
                beforeEach(function() {
                    this.listener = jasmine.createSpy("listener");
                    this.instance.addQuantityListener(this.listener);
                    this.setQuantity();
                });

                it("passes the basket item to the listener", function() {
                    expect(this.listener).toHaveBeenCalledWith(this.instance);
                });
            });
        });
    });

    describe("subtotal()", function() {
        beforeEach(function() {
            this.instantiate();
            this.result = this.instance.subtotal();
        });

        it("returns the price times the quantity", function() {
            expect(this.result).toEqual(this.price * this.quantity);
        });
    });
});