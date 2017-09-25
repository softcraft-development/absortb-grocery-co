// In tests, we don't want error logs to actually log to the console,
// nor attempt to add a notification.
beforeEach(function() {
    this.errorHandlingLog = spyOn(Absorb.GroceryCo.Checkout.ErrorHandling, "log");
});