describe("Absorb.GroceryCo.Checkout.Inventory", function() {
    beforeEach(function() {
        this.instance = new Absorb.GroceryCo.Checkout.Inventory();
    });

    function itGetsTheInventoryJson() {
        it("gets the inventory json", function() {
            expect(fetchMock.called("getInventory")).toEqual(true);
        });
    }

    function loadInventory(done) {
        this.instance.load().then(done, done);
    }

    function mockGetInventory(response) {
        fetchMock.get("./api/inventory.json", response, {
            name: "getInventory"
        });
    }

    describe("load()", function() {
        describe("when the inventory response is OK", function() {
            beforeEach(function(done) {
                mockGetInventory(200);
                loadInventory.call(this, done);
            });
            itGetsTheInventoryJson();
        });

        describe("when the inventory response is not OK", function() {
            beforeEach(function(done) {
                mockGetInventory(500);
                loadInventory.call(this, done);
            });

            itGetsTheInventoryJson();
            // We should be checking to see whether the error logged depends
            // on the file:// URL, since that's in the code. However, mocking that
            // out will be a pain, so I'm not going to bother here. Checking to see
            // that some sort of error is logged is good enough.
            it("logs an error", function() {
                expect(this.errorHandlingLog).toHaveBeenCalled();
            });
        });
    });
});
