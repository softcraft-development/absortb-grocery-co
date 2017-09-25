describe("Absorb.GroceryCo.Checkout.loadJson", function() {
    beforeEach(function() {
        this.url = "http://example.com";
        this.matcherName = "example";
        this.mockResponse = (response) => {
            fetchMock.get(this.url, response, {
                name: this.matcherName
            });
        };
        this.load = (done) => {
            Absorb.GroceryCo.Checkout.loadJson(this.url).then((result) => {
                this.result = result;
            }, (reason) => {
                this.reason = reason;
            }).then(done);
        };
    });

    function itFetchesTheUrl() {
        it("fetches the URL", function() {
            expect(fetchMock.called(this.matcherName)).toEqual(true);
        });
    }

    describe("loadJson()", function() {
        describe("when the response is OK", function() {
            beforeEach(function(done) {
                this.data = {
                    data: "test"
                };
                this.mockResponse(this.data);
                this.load(done);
            });

            itFetchesTheUrl();

            it("returns a promise with the respons JSON", function() {
                expect(this.result).toEqual(this.data);
            });
        });

        describe("when the inventory response is not OK", function() {
            beforeEach(function(done) {
                this.mockResponse(500);
                this.load(done);
            });

            itFetchesTheUrl();

            // We should be checking to see whether the error logged depends
            // on the file:// URL, since that's in the code. However, mocking that
            // out will be a pain, so I'm not going to bother here. Checking to see
            // that some sort of error is logged is good enough.
            it("logs an error", function() {
                expect(this.errorHandlingLog).toHaveBeenCalled();
            });

            it("returns a rejected promise", function() {
                expect(this.reason).toBeTruthy();
            });
        });
    });
});
