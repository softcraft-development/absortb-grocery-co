describe("Absorb.GroceryCo.Checkout.Promotions.Group", function() {
    beforeEach(function() {
        this.id = "test-group-id";
        this.promotionQuantity = 23;
        this.promotionPrice = 29;
        this.regularPrice = 31;
        this.instance = new Absorb.GroceryCo.Checkout.Promotions.Group(
            this.id,
            this.promotionQuantity,
            this.promotionPrice
        );
        this.getResult = () => {
            return this.instance.expectedPrice(this.actualQuantity, this.regularPrice);
        };
    });

    describe("expectedPrice()", function() {
        describe("when the actual quantity is less than the promotion quantity", function() {
            beforeEach(function() {
                this.actualQuantity = this.promotionQuantity - 1;
                this.result = this.getResult();
            });
            it("does not apply any discount", function() {
                expect(this.result).toEqual(this.actualQuantity * this.regularPrice);
            });
        });

        describe("when the actual quantity is equal to the promotion quantity", function() {
            beforeEach(function() {
                this.actualQuantity = this.promotionQuantity;
                this.result = this.getResult();
            });
            it("returns the promotion price", function() {
                expect(this.result).toEqual(this.promotionPrice);
            });
        });

        describe("when the actual quantity exceeds the promotion quantity", function() {
            beforeEach(function() {
                this.excessQuantity = 37;
                this.actualQuantity = this.promotionQuantity + this.excessQuantity;
                this.result = this.getResult();
            });
            it("returns the promotion price plus the regular price for the excess", function() {
                expect(this.result).toEqual(this.promotionPrice + (this.excessQuantity * this.regularPrice));
            });
        });

        describe("when the actual quantity is multiples of the promotion quality", function() {
            beforeEach(function() {
                this.multiples = 41;
                this.actualQuantity = (this.promotionQuantity * this.multiples);
                this.result = this.getResult();
            });
            // We're not multiply applying promotions; see src/js/promotions/notes.md
            it("returns the promotion price plus the regular price for the excess", function() {
                const excessQuantity = this.actualQuantity - this.promotionQuantity;
                expect(this.result).toEqual(this.promotionPrice + (excessQuantity * this.regularPrice));
            });
        });
    });
});
