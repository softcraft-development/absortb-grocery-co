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

            it("has prefixed description as the text", function() {
                expect(this.subject.innerText).toEqual(`@ ${this.description}`);
            });
        });
    });
});