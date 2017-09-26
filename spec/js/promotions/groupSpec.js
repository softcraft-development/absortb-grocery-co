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
        this.getResult = () => {
            return this.instance.calculateDiscount(this.actualQuantity, this.regularPrice);
        };
    });

    function itReturnsThePromotionDiscount(){
        it("returns the promotion discount", function() {
            expect(this.result).toEqual(this.promotionDiscount);
        });
    }

    describe("calculateDiscount()", function() {
        describe("when the actual quantity is less than the promotion quantity", function() {
            beforeEach(function() {
                this.actualQuantity = this.promotionQuantity - 1;
                this.result = this.getResult();
            });
            it("does not apply any discount", function() {
                expect(this.result).toBeNull();
            });
        });

        describe("when the actual quantity is equal to the promotion quantity", function() {
            beforeEach(function() {
                this.actualQuantity = this.promotionQuantity;
                this.result = this.getResult();
            });
            itReturnsThePromotionDiscount();
        });

        describe("when the actual quantity exceeds the promotion quantity", function() {
            beforeEach(function() {
                this.excessQuantity = 37;
                this.actualQuantity = this.promotionQuantity + this.excessQuantity;
                this.result = this.getResult();
            });
            itReturnsThePromotionDiscount();
        });

        describe("when the actual quantity is multiples of the promotion quality", function() {
            beforeEach(function() {
                this.multiples = 41;
                this.actualQuantity = (this.promotionQuantity * this.multiples);
                this.result = this.getResult();
            });
            // We're not multiply applying promotions; see src/js/promotions/notes.md
            itReturnsThePromotionDiscount();
        });
    });
});
