describe("Absorb.GroceryCo.Checkout.Notification", function() {
    beforeEach(function() {
        this.message = "Test message";
        this.className = "test-class-name";
        this.instance = new Absorb.GroceryCo.Checkout.Notification(
            this.message,
            this.className
        );
    });

    describe("className", function() {
        beforeEach(function() {
            this.subject = this.instance.className;
        });

        it("is assigned upon construction", function() {
            expect(this.subject).toEqual(this.className);
        });
    });

    describe("message", function() {
        beforeEach(function() {
            this.subject = this.instance.message;
        });

        it("is assigned upon construction", function() {
            expect(this.subject).toEqual(this.message);
        });
    });

    describe("onDismiss", function() {
        beforeEach(function() {

        });
    });

    describe("when render is called", function() {
        beforeEach(function() {
            this.result = this.instance.render();
        });

        describe("the rendered element", function(){
            beforeEach(function() {
                this.subject = this.result;
            }); 

            it("is a div", function(){
                expect(this.subject.tagName.toLowerCase()).toEqual("div");
            });

            it("has the notification class", function(){
                expect(this.subject.className).toContain("notification");
            });

            it("has the class from the className property", function(){
                expect(this.subject.className).toContain(this.className);
            });
        });
    });

    describe("when there is already a rendered element", function() {
        beforeEach(function() {
            this.dummy = "A dummy element";
            this.instance.$el = this.dummy;
        });
        
        describe("render", function() {
            beforeEach(function() {
                this.result = this.instance.render();
            });

            it("returns that element", function() {
                expect(this.result).toBe(this.dummy);
            });

            it("keeps the element as the $el property", function() {
                expect(this.instance.$el).toBe(this.dummy);
            });
        });
    });
});