describe("Absorb.GroceryCo.Checkout.BasketItem", function() {
    beforeEach(function() {
        this.id = "test-basket-item-id";
        this.price = 3;
        this.quantity = 5;

        this.instantiate = () => {
            this.instance = new Absorb.GroceryCo.Checkout.BasketItem(
                this.id,
                this.price,
                this.promotions,
                this.quantity
            );
            return this.instance;
        };
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