describe("Absorb.GroceryCo.Checkout.Notifications", function() {
    beforeEach(function() {
        const $sandbox = document.getElementById("jasmine-sandbox");
        this.$notifications = document.createElement("div");
        $sandbox.appendChild(this.$notifications);
        this.$notifications.setAttribute("id", "notifications");
    });

    describe("add()", function(){
        describe("when passed a notification", function(){
            beforeEach(function(){
                this.notification = new Absorb.GroceryCo.Checkout.Notification(
                    "Test Message",
                    "test-class-name"
                );
                this.notificationRenderSpy = spyOn(this.notification, "render").and.callThrough();
                this.result = Absorb.GroceryCo.Checkout.Notifications.add(this.notification);
            });

            it("renders the notification", function(){
                // In this spec I've set up a spy on the Notification.render() and then
                // set an expectation that Notifications.add() will call it. This is 
                // intentionally dependent on a specific implementation detail of add().
                // I want to ensure that the render method, such as it exists today,
                // is called, so that I can guarantee that the resulting notification
                // that we're adding has been fully rendered to my expectations.
                // 
                // Expecting this implementation detail means that we can defer all 
                // testing of the actual content of the notification to the set of 
                // specs on Notification.render() itself. 
                //
                // If we didn't do this, then to guarantee the correctness of 
                // the Notifications content, we'd have to test the 
                // contents of the notification element itself here. That would make 
                // the Notifications tests more complex due to all the leakage of 
                // Notification's functionality tests.
                //
                // It may well be that someday Notifications will intentionall *not* 
                // call render(), and thus this test will break. That's fine, as it's an
                // implementation change. The Notifications tests will then need to be
                // rewritten to adapt to the new implementation.

                expect(this.notificationRenderSpy).toHaveBeenCalled();
            });

            describe("the first notification container child", function(){
                beforeEach(function() {
                    this.subject = this.$notifications.firstChild;
                });

                it("is the notification element", function(){
                    expect(this.subject).toBe(this.notification.$el);
                });
            });
        });
    });
});