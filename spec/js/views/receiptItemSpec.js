describe("Absorb.GroceryCo.Checkout.Views.ReceiptItem", function() {
    beforeEach(function() {
        this.instance = new Absorb.GroceryCo.Checkout.Views.ReceiptItem();
    });

    describe("render()", function() {
        beforeEach(function() {
            this.productId = "test-item-id";
            this.productName = "Test Name";
            this.productPrice = 3;
            this.productPromotions = [];
            this.productQuantity = 5;
            this.quantity = 0;

            this.render = () => {
                this.basketItem = new Absorb.GroceryCo.Checkout.BasketItem(
                    this.productId,
                    this.productName,
                    this.productPrice,
                    this.productPromotions,
                    this.quantity,
                    this.productQuantity
                );
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
                        expect(this.subject).toHaveCssClass("none");
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

                describe("the container element", function() {
                    beforeEach(function() {
                        this.subject = this.result;
                    });
                    it("does not have the none class", function() {
                        expect(this.subject).not.toHaveCssClass("none");
                    });
                });
            });
        });
    });

    function itAddsOneChild() {
        it("adds a child to the container", function() {
            expect(this.$container.children.length).toEqual(1);
        });
    }

    function subjectIsFirstChild() {
        beforeEach(function() {
            this.subject = this.$container.firstChild;
        });
    }

    describe("renderDiscount()", function() {
        beforeEach(function() {
            this.$container = document.createElement("div");
            this.discount = 3;
            this.instance.renderDiscount(this.$container, this.discount);
        });

        itAddsOneChild();

        describe("container first child", function() {
            subjectIsFirstChild();

            it("is a div", function() {
                expect(this.subject).toHaveTagName("div");
            });

            it("has the discount class", function() {
                expect(this.subject).toHaveCssClass("discount");
            });

            it("has the formatted negated discount as the text", function() {
                expect(this.subject.innerText).toEqual(Absorb.GroceryCo.Checkout.formatPrice(-this.discount));
            });
        });
    });

    describe("renderName()", function() {
        beforeEach(function() {
            this.$container = document.createElement("div");
            this.name = "Test Name";
            this.instance.renderName(this.$container, this.name);
        });

        itAddsOneChild();

        describe("container first child", function() {
            subjectIsFirstChild();

            it("is a div", function() {
                expect(this.subject).toHaveTagName("div");
            });

            it("has the name class", function() {
                expect(this.subject).toHaveCssClass("name");
            });

            it("has the name as the text", function() {
                expect(this.subject.innerText).toEqual(this.name);
            });
        });
    });

    describe("renderPromotion()", function() {
        beforeEach(function() {
            this.$container = document.createElement("div");
            this.renderPromotion = () => {
                this.result = this.instance.renderPromotion(this.$container, this.basketItem);
            };
        });

        describe("when there is a promotion applied", function() {
            beforeEach(function() {
                this.promotion = "Test Promotion";
                this.discount = 0.3;
                this.promotionDescriptor = {
                    discount: this.discount,
                    promotion: this.promotion
                };
                this.basketItem = {
                    appliedPromotion: () => {
                        return this.promotionDescriptor;
                    }
                };
                spyOn(this.instance, "renderPromotionName");
                spyOn(this.instance, "renderPromotionDescription");
                spyOn(this.instance, "renderDiscount");
                this.renderPromotion();
            });
            itAddsOneChild();

            describe("container first child", function() {
                subjectIsFirstChild();

                it("is a div", function() {
                    expect(this.subject).toHaveTagName("div");
                });

                it("has the promotion class", function() {
                    expect(this.subject).toHaveCssClass("promotion");
                });

                it("has the receipt line class", function() {
                    expect(this.subject).toHaveCssClass("receipt-line");
                });

                it("renders the promotion name", function() {
                    expect(this.instance.renderPromotionName).toHaveBeenCalledWith(this.subject);
                });

                it("renders the promotion description", function() {
                    expect(this.instance.renderPromotionDescription).toHaveBeenCalledWith(this.subject, this.promotion);
                });

                it("renders the discount", function() {
                    expect(this.instance.renderDiscount).toHaveBeenCalledWith(this.subject, this.discount);
                });
            });
        });

        describe("when there is no promotion applied", function() {
            beforeEach(function() {
                this.basketItem = {
                    appliedPromotion() {
                        return null;
                    }
                };
                this.renderPromotion();
            });
            it("adds no children", function() {
                expect(this.$container.firstChild).toBeNull();
            });
        });
    });

    describe("renderPromotionDescription()", function() {
        beforeEach(function() {
            this.$container = document.createElement("div");
            this.description = "Test Description";
            this.promotion = {
                describe: ()=>{
                    return this.description;
                }
            };
            this.instance.renderPromotionDescription(this.$container, this.promotion);
        });

        itAddsOneChild();

        describe("container first child", function() {
            subjectIsFirstChild();

            it("is a div", function() {
                expect(this.subject).toHaveTagName("div");
            });

            it("has the description class", function() {
                expect(this.subject).toHaveCssClass("description");
            });

            it("has the description as the text", function() {
                expect(this.subject.innerText).toEqual(this.description);
            });
        });
    });

    describe("renderPromotionName()", function() {
        beforeEach(function() {
            this.$container = document.createElement("div");
            this.instance.renderPromotionName(this.$container);
        });

        itAddsOneChild();

        describe("container first child", function() {
            subjectIsFirstChild();

            it("is a div", function() {
                expect(this.subject).toHaveTagName("div");
            });

            it("has the name class", function() {
                expect(this.subject).toHaveCssClass("name");
            });

            it("has Promo as the text", function() {
                expect(this.subject.innerText).toEqual("Promo");
            });
        });
    });

    describe("renderRegularItem()", function() {
        beforeEach(function() {
            this.$container = document.createElement("div");
            this.name = "Test Name";
            this.quantity = 5;
            this.price = 7;
            this.subtotal = 11;
            this.basketItem = {
                name: this.name,
                price: this.price,
                quantity: this.quantity,
                subtotal: () => {
                    return this.subtotal;
                }
            };
            spyOn(this.instance, "renderName");
            spyOn(this.instance, "renderRegularPrice");
            spyOn(this.instance, "renderRegularTotal");
            this.instance.renderRegularItem(this.$container, this.basketItem);
        });

        itAddsOneChild();

        describe("container first child", function() {
            subjectIsFirstChild();

            it("is a div", function() {
                expect(this.subject).toHaveTagName("div");
            });

            it("has the receipt line class", function() {
                expect(this.subject).toHaveCssClass("receipt-line");
            });

            it("has the regular class", function() {
                expect(this.subject).toHaveCssClass("regular");
            });
            
            it("renders the name", function() {
                expect(this.instance.renderName).toHaveBeenCalledWith(
                    this.subject,
                    this.name
                );
            });

            it("renders the regular price", function() {
                expect(this.instance.renderRegularPrice).toHaveBeenCalledWith(
                    this.subject,
                    this.price,
                    this.quantity
                );
            });

            it("renders the total", function() {
                expect(this.instance.renderRegularTotal).toHaveBeenCalledWith(
                    this.subject,
                    this.subtotal
                );
            });
        });
    });

    describe("renderRegularPrice()", function() {
        beforeEach(function() {
            this.$container = document.createElement("div");
            this.price = 11;
            this.quantity = 13;
            this.instance.renderRegularPrice(this.$container, this.price, this.quantity);
        });

        itAddsOneChild();

        describe("container first child", function() {
            subjectIsFirstChild();

            it("is a div", function() {
                expect(this.subject).toHaveTagName("div");
            });

            it("has the price class", function() {
                expect(this.subject).toHaveCssClass("price");
            });

            it("has price description text", function() {
                const formattedPrice = Absorb.GroceryCo.Checkout.formatPrice(this.price);
                expect(this.subject.innerText).toEqual(
                    `@ ${formattedPrice} x ${this.quantity.toLocaleString()}`
                );
            });
        });
    });

    describe("renderRegularTotal()", function() {
        beforeEach(function() {
            this.$container = document.createElement("div");
            this.total = 17;
            this.instance.renderRegularTotal(this.$container, this.total);
        });

        itAddsOneChild();

        describe("container first child", function() {
            subjectIsFirstChild();

            it("is a div", function() {
                expect(this.subject).toHaveTagName("div");
            });

            it("has the total class", function() {
                expect(this.subject).toHaveCssClass("total");
            });

            it("has total text", function() {
                expect(this.subject.innerText).toEqual(
                    Absorb.GroceryCo.Checkout.formatPrice(this.total)
                );
            });
        });
    });
});