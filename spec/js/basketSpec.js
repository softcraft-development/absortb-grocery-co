describe("Absorb.GroceryCo.Checkout.Basket", function() {
    beforeEach(function() {
        this.instance = new Absorb.GroceryCo.Checkout.Basket();
    });

    describe("createPromotion()", function() {
        beforeEach(function() {
            this.id = "test-promotion-id";
            this.price = 7;
            this.quantity = 11;
            this.discount = 0.13;
            this.create = () => {
                this.promotionData = {
                    discount: this.discount,
                    id: this.id,
                    price: this.price,
                    quantity: this.quantity,
                    type: this.type,
                };
                this.result = this.instance.createPromotion(this.promotionData);
                // In this case, the subject is always the result, so we can 
                // just assign it here.
                this.subject = this.result;
            };
        });

        function itSetsTheId() {
            it("has the ID property set", function() {
                expect(this.subject.id).toEqual(this.id);
            });
        }

        function itSetsThePrice() {
            it("has the price property set", function() {
                expect(this.subject.price).toEqual(this.price);
            });
        }

        function itSetsTheQuantity() {
            it("has the quantity property set", function() {
                expect(this.subject.quantity).toEqual(this.quantity);
            });
        }

        function itSetsTheDiscount() {
            it("has the discount property set", function() {
                expect(this.subject.discount).toEqual(this.discount);
            });
        }

        describe("when the type is sale", function() {
            beforeEach(function() {
                this.type = "sale";
                this.create();
            });

            describe("the created promotion", function() {
                it("is a Sale", function() {
                    expect(this.subject instanceof Absorb.GroceryCo.Checkout.Promotions.Sale).toEqual(true);
                });
                itSetsTheId();
                itSetsThePrice();
            });
        });
        describe("when the type is group", function() {
            beforeEach(function() {
                this.type = "group";
                this.create();
            });

            describe("the created promotion", function() {
                it("is a Group", function() {
                    expect(this.subject instanceof Absorb.GroceryCo.Checkout.Promotions.Group).toEqual(true);
                });
                itSetsTheId();
                itSetsThePrice();
                itSetsTheQuantity();
            });
        });
        describe("when the type is additionalProduct", function() {
            beforeEach(function() {
                this.type = "additionalProduct";
                this.create();
            });

            describe("the created promotion", function() {
                it("is an AdditionalProduct", function() {
                    expect(this.subject instanceof Absorb.GroceryCo.Checkout.Promotions.AdditionalProduct).toEqual(true);
                });
                itSetsTheId();
                itSetsTheDiscount();
                itSetsTheQuantity();
            });
        });
        describe("when the type unknown", function() {
            beforeEach(function() {
                this.type = "something else";
                this.create();
            });

            it("returns null", function() {
                expect(this.result).toBeNull();
            });
        });
    });

    describe("load()", function() {
        beforeEach(function() {
            this.promotionsData = {
                promotions: []
            };
            this.basketData = {
                basket: []
            };
            this.load = () => {
                this.result = this.instance.load(this.inventoryData, this.promotionsData, this.basketData);
            };
        });

        describe("when passed inventory product data", function() {
            beforeEach(function() {
                this.productId = "test-product";
                this.productName = "Test Name";
                this.productPrice = 3;
                this.inventoryData = {
                    products: [
                        {
                            id: this.productId,
                            name: this.productName,
                            price: this.productPrice
                        }
                    ]
                };
            });

            describe("and matching basket item data", function() {
                beforeEach(function() {
                    this.basketQuantity = 5;
                    this.basketData = {
                        basket: [
                            {
                                productId: this.productId,
                                quantity: this.basketQuantity
                            }
                        ]
                    };
                });

                describe("the first item", function() {
                    beforeEach(function() {
                        this.load();
                        this.subject = this.instance.items[0];
                    });

                    it("is a BasketItem", function() {
                        // In general, duck typing is a good thing,
                        // but I'll frequently do type check tests
                        // just to ensure that we're getting an object 
                        // that's also under tests. If it matters,
                        // I'll write the appropriate tests to check for
                        // duck typed methods; this way is just quicker.
                        // 
                        // Note that I usually like to install/write a
                        // toBeInstanceOf() check into Jasmine so that,
                        // if it fails, I can see what the object's actual
                        // class/prototype is. This just gives me a "false".
                        expect(this.subject instanceof Absorb.GroceryCo.Checkout.BasketItem).toEqual(true);
                    });

                    it("has the product id", function() {
                        expect(this.subject.id).toEqual(this.productId);
                    });

                    it("has the product name", function() {
                        expect(this.subject.name).toEqual(this.productName);
                    });

                    it("has the product price", function() {
                        expect(this.subject.price).toEqual(this.productPrice);
                    });

                    it("has no promotions", function() {
                        expect(this.subject.promotions).toEqual([]);
                    });

                    it("has the basket quantity", function() {
                        expect(this.subject.quantity).toEqual(this.basketQuantity);
                    });
                });

                describe("and matching promotions", function() {
                    beforeEach(function() {
                        this.promotionData = {
                            productId: this.productId
                        };
                        this.promotionsData = {
                            promotions: [
                                this.promotionData
                            ]
                        };
                        this.promotion = {
                            id: "A promotion object"
                        };
                        spyOn(this.instance, "createPromotion").and.returnValue(this.promotion);
                        this.load();
                    });

                    it("passes the promotion data to createPromotion", function() {
                        expect(this.instance.createPromotion).toHaveBeenCalledWith(this.promotionData);
                    });

                    describe("the first item", function() {
                        beforeEach(function() {
                            this.subject = this.instance.items[0];
                        });

                        it("has the created promotion", function() {
                            expect(this.subject.promotions).toEqual([this.promotion]);
                        });
                    });
                });
            });

            describe("and no matching basket item data", function() {
                beforeEach(function() {
                    this.basketData = {
                        basket: []
                    };
                });

                describe("the items", function() {
                    beforeEach(function() {
                        this.subject = this.instance.items;
                    });

                    it("are empty", function() {
                        expect(this.subject).toEqual([]);
                    });
                });
            });
        });
    });
});