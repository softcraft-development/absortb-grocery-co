describe("Absorb.GroceryCo.Checkout.Promotions.AdditionalProduct", function() {
    beforeEach(function() {
        this.id = "test-additional-product-id";
        this.promotionQuantity = 11;
        this.discount = 0.13;
        this.regularPrice = 17;
        this.instantiate = () => {
            this.instance = new Absorb.GroceryCo.Checkout.Promotions.AdditionalProduct(
                this.id,
                this.promotionQuantity,
                this.discount
            );
            return this.instance;
        };
    });

    function noDiscount() {
        it("does not apply any discount", function() {
            expect(this.result).toBeNull();
        });
    }

    function discountOneItem() {
        it("applies the discount to the discounted item", function() {
            const discount = this.regularPrice * this.discount;
            expect(this.result).toEqual(discount);
        });
    }

    describe("calculateDiscount()", function() {
        beforeEach(function() {
            this.getResult = () => {
                this.instantiate();
                this.result = this.instance.calculateDiscount(this.actualQuantity, this.regularPrice);
                return this.result;
            };
        });

        describe("when the actual quantity is less than the promotion quantity", function() {
            beforeEach(function() {
                this.actualQuantity = this.promotionQuantity - 1;
                this.getResult();
            });
            noDiscount();
        });

        describe("when the actual quantity is equal to the promotion quantity", function() {
            beforeEach(function() {
                this.actualQuantity = this.promotionQuantity;
                this.getResult();
            });
            noDiscount();
        });

        describe("when the actual quantity meets the promotion quality plus a discounted item", function() {
            beforeEach(function() {
                this.actualQuantity = this.promotionQuantity + 1;
                this.getResult();
            });
            discountOneItem();
        });

        describe("when the actual quantity exceeds the promotion quality plus a discounted item", function() {
            beforeEach(function() {
                // I like doing multiple additions to show the logic of the calculation.
                // Take the promo quantity, add one for the discounted item, and then go one bigger
                // to over-apply.
                this.actualQuantity = this.promotionQuantity + 1 + 1;
                this.getResult();
            });
            discountOneItem();
        });

        describe("when the actual quantity exceeds multiples of the promotion quality", function() {
            beforeEach(function() {
                this.actualQuantity = ((this.promotionQuantity + 1) * 19) + 1;
                this.getResult();
            });
            // We're not multiply applying promotions; see src/js/promotions/notes.md
            discountOneItem();
        });
    });

    describe("describe()", function() {
        beforeEach(function() {
            this.getResult = () => {
                this.instantiate();
                this.result = this.instance.describe();
                return this.result;
            };
        });

        describe("when the discount is zero", function() {
            beforeEach(function() {
                this.discount = 0;
                this.getResult();
            });
            it("returns buy X get one free", function(){
                expect(this.result).toEqual(`Buy ${this.promotionQuantity} Get 1 FREE`);
            });
        });

        describe("when the discount is nonzero", function() {
            beforeEach(function() {
                this.getResult();
            });
            it("returns buy X get one @ discount percent", function(){
                const value = this.discount.toLocaleString(navigator.language, {
                    style: "percent"
                });
                expect(this.result).toEqual(`Buy ${this.promotionQuantity} Get 1 @ ${value} off`);
            });
        });
    });
});
