describe("Absorb.GroceryCo.Checkout.Promotions.Sale", function() {
    beforeEach(function() {
        this.id = "test-sale-id";
        this.salePrice = 3;
        this.instance = new Absorb.GroceryCo.Checkout.Promotions.Sale(this.id, this.salePrice);
    });

    describe("expectedPrice()", function(){
        beforeEach(function(){
            this.quantity = 5;
            this.regularPrice = 7;
            this.result = this.instance.expectedPrice(this.quantity, this.regularPrice);
        });
        
        // This test is the simplest of all, since the underlying formula is also simple.
        // In theory I could throw a series of specific values at it, but it's not 
        // really necessary yet. If specific values *do* (appear to) cause problems
        // in real-world testing, then I'll definitely include those as subsequent test cases.
        it("multiplies the quantity by the sale price", function(){
            expect(this.result).toEqual(this.quantity * this.salePrice);
        });
    });
});
