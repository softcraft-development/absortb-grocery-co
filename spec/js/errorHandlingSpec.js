describe("Absorb.GroceryCo.Checkout.ErrorHandling", function() {
    describe("log()", function(){
        describe("when passed a reason", function(){
            beforeEach(function(){
                // We mock out the log method for tests in general,
                // but need to reinstate it when we're actually testing it.
                this.errorHandlingLog.and.callThrough();
                this.reason = "Test Reason";
                this.consoleErrorSpy = spyOn(console, "error");
                this.notificationsAddSpy = spyOn(Absorb.GroceryCo.Checkout.Notifications, "add");
                this.result = Absorb.GroceryCo.Checkout.ErrorHandling.log(this.reason);
            });

            it("logs the reason to the console as an error", function(){
                expect(this.consoleErrorSpy).toHaveBeenCalledWith(this.reason);
            });

            it("adds a Notification", function(){
                expect(this.notificationsAddSpy).toHaveBeenCalledWith(jasmine.any(Absorb.GroceryCo.Checkout.Notification));
            });

            describe("the added notification", function(){
                beforeEach(function(){
                    this.subject = this.notificationsAddSpy.calls.argsFor(0)[0];
                });

                it("has the reason as the message", function(){
                    expect(this.subject.message).toEqual(this.reason);
                });

                it("has the error class", function(){
                    expect(this.subject.className).toEqual("error");
                });
            });
        });
    });
});