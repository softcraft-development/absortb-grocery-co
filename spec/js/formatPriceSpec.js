describe("Absorb.GroceryCo.Checkout.formatPrice", function() {
    beforeEach(function() {
        this.value = 3;
        spyOn(this.value, "toLocaleString");
        this.result = Absorb.GroceryCo.Checkout.formatPrice(this.value);
    });

    // This is a test barely worth having, as it just re-implements the
    // code under test. The value (such as there is) comes from 
    // guaranteeing that no dev can change the original code without
    // also changing the (otherwise failing) test, and thus having to
    // think about what they're doing.
    it("passes the formatting settings to", function(){
        expect(this.result).toEqual(this.value.toLocaleString(navigator.language, {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        }));
    });
});
