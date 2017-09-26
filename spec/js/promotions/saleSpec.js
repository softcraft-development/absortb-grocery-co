describe("Absorb.GroceryCo.Checkout.Promotions.Sale", function() {
    beforeEach(function() {
        this.id = "test-sale-id";
        this.salePrice = 3;
        this.instance = new Absorb.GroceryCo.Checkout.Promotions.Sale(this.id, this.salePrice);
    });

    describe("calculateDiscount()", function(){
        beforeEach(function(){
            this.quantity = 5;
            this.regularPrice = 7;
            this.result = this.instance.calculateDiscount(this.quantity, this.regularPrice);
        });
        
        // This test is the simplest of all, since the underlying formula is also simple.
        // In theory I could throw a series of specific values at it, but it's not 
        // really necessary yet. If specific values *do* (appear to) cause problems
        // in real-world testing, then I'll definitely include those as subsequent test cases.
        //
        // Note that I'm intentionally calculating the discount in a different way than
        // in the real code. I want to test the logic, not the implementation if I can help it.
        it("multiplies the quantity by the sale price", function(){
            const regularTotal = this.quantity * this.regularPrice;
            const saleTotal = this.quantity * this.salePrice;
            const discount = regularTotal - saleTotal;
            expect(this.result).toEqual(discount);
        });
    });
});
