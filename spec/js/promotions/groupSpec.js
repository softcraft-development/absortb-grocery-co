describe("Absorb.GroceryCo.Checkout.Promotions.Group", function() {
    beforeEach(function() {
        this.id = "test-group-id";
        this.promotionQuantity = 23;
        this.promotionPrice = 29;
        this.regularPrice = 31;
        this.promotionDiscount = (this.regularPrice * this.promotionQuantity) - this.promotionPrice;
        this.instance = new Absorb.GroceryCo.Checkout.Promotions.Group(
            this.id,
            this.promotionQuantity,
            this.promotionPrice
        );
    });

    function itReturnsThePromotionDiscount() {
        it("returns the promotion discount", function() {
            expect(this.result).toEqual(this.promotionDiscount);
        });
    }

    describe("calculateDiscount()", function() {
        beforeEach(function() {
            this.getResult = () => {
                this.result = this.instance.calculateDiscount(this.actualQuantity, this.regularPrice);
                return this.result;
            };
        });
        describe("when the actual quantity is less than the promotion quantity", function() {
            beforeEach(function() {
                this.actualQuantity = this.promotionQuantity - 1;
                this.getResult();
            });
            it("does not apply any discount", function() {
                expect(this.result).toBeNull();
            });
        });

        describe("when the actual quantity is equal to the promotion quantity", function() {
            beforeEach(function() {
                this.actualQuantity = this.promotionQuantity;
                this.getResult();
            });
            itReturnsThePromotionDiscount();
        });

        describe("when the actual quantity exceeds the promotion quantity", function() {
            beforeEach(function() {
                this.excessQuantity = 37;
                this.actualQuantity = this.promotionQuantity + this.excessQuantity;
                this.getResult();
            });
            itReturnsThePromotionDiscount();
        });

        describe("when the actual quantity is multiples of the promotion quality", function() {
            beforeEach(function() {
                this.multiples = 41;
                this.actualQuantity = (this.promotionQuantity * this.multiples);
                this.getResult();
            });
            // We're not multiply applying promotions; see src/js/promotions/notes.md
            itReturnsThePromotionDiscount();
        });
    });

    describe("describe()", function() {
        beforeEach(function() {
            this.result = this.instance.describe();
        });

        it("returns the quantity for price", function() {
            const price = Absorb.GroceryCo.Checkout.formatPrice(this.promotionPrice);
            expect(this.result).toEqual(`${this.promotionQuantity} for ${price}`);
        });
    });
});
