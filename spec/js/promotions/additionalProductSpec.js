describe("Absorb.GroceryCo.Checkout.Promotions.AdditionalProduct", function() {
    beforeEach(function() {
        this.id = "test-additional-product-id";
        this.promotionQuantity = 11;
        this.discount = 0.13;
        this.regularPrice = 17;
        this.instance = new Absorb.GroceryCo.Checkout.Promotions.AdditionalProduct(
            this.id,
            this.promotionQuantity,
            this.discount
        );
        this.getResult = () => {
            return this.instance.expectedPrice(this.actualQuantity, this.regularPrice);
        };
    });

    function noDiscount() {
        it("does not apply any discount", function() {
            expect(this.result).toEqual(this.actualQuantity * this.regularPrice);
        });
    }

    function discountOneItem() {
        it("applies the discount to the discounted item", function() {
            const discount = this.regularPrice * this.discount;
            const targetPrice = (this.actualQuantity * this.regularPrice) - discount;
            expect(this.result).toEqual(targetPrice);
        });
    }

    describe("expectedPrice()", function() {
        describe("when the actual quantity is less than the promotion quantity", function() {
            beforeEach(function() {
                this.actualQuantity = this.promotionQuantity - 1;
                this.result = this.getResult();
            });
            noDiscount();
        });

        describe("when the actual quantity is equal to the promotion quantity", function() {
            beforeEach(function() {
                this.actualQuantity = this.promotionQuantity;
                this.result = this.getResult();
            });
            noDiscount();
        });

        describe("when the actual quantity meets the promotion quality plus a discounted item", function() {
            beforeEach(function() {
                this.actualQuantity = this.promotionQuantity + 1;
                this.result = this.getResult();
            });
            discountOneItem();
        });

        describe("when the actual quantity exceeds the promotion quality plus a discounted item", function() {
            beforeEach(function() {
                // I like doing multiple additions to show the logic of the calculation.
                // Take the promo quantity, add one for the discounted item, and then go one bigger
                // to over-apply.
                this.actualQuantity = this.promotionQuantity + 1 + 1;
                this.result = this.getResult();
            });
            discountOneItem();
        });

        describe("when the actual quantity exceeds multiples of the promotion quality", function() {
            beforeEach(function() {
                this.actualQuantity = ((this.promotionQuantity + 1) * 19) + 1;
                this.result = this.getResult();
            });
            // We're not multiply applying promotions; see src/js/promotions/notes.md
            discountOneItem();
        });
    });
});
