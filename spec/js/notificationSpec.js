describe("Absorb.GroceryCo.Checkout.Notification", function() {
    beforeEach(function() {
        this.message = "Test message";
        this.className = "test-class-name";
        this.instance = new Absorb.GroceryCo.Checkout.Notification(
            this.message,
            this.className
        );
    });

    describe(".className", function() {
        beforeEach(function() {
            this.subject = this.instance.className;
        });

        it("is assigned upon construction", function() {
            expect(this.subject).toEqual(this.className);
        });
    });

    describe(".message", function() {
        beforeEach(function() {
            this.subject = this.instance.message;
        });

        it("is assigned upon construction", function() {
            expect(this.subject).toEqual(this.message);
        });
    });

    describe("onDismiss()", function() {
        beforeEach(function() {

        });
    });

    describe("render()", function() {
        beforeEach(function() {
            this.result = this.instance.render();
        });

        describe("result", function() {
            beforeEach(function() {
                this.subject = this.result;
            });

            it("is a div", function() {
                expect(this.subject.tagName.toLowerCase()).toEqual("div");
            });

            it("has the notification class", function() {
                expect(this.subject.className).toContain("notification");
            });

            it("has the class from the className property", function() {
                expect(this.subject.className).toContain(this.className);
            });

            describe("first child", function() {
                beforeEach(function() {
                    this.subject = this.result.firstChild;
                });

                it("is a span", function(){
                    expect(this.subject.tagName.toLowerCase()).toEqual("span");
                });

                it("has the message class", function() {
                    expect(this.subject.className).toContain("message");
                });
                
                it("contains the message", function() {
                    expect(this.subject.innerText).toEqual(this.message);
                });
            });

            describe("second child", function() {
                beforeEach(function() {
                    this.subject = this.result.childNodes[1];
                });

                it("is a button", function(){
                    expect(this.subject.tagName.toLowerCase()).toEqual("button");
                });

                it("is of type button", function(){
                    expect(this.subject.getAttribute("type")).toEqual("button");
                });

                it("has the dismiss class", function() {
                    expect(this.subject.className).toContain("dismiss");
                });

                it("has the dismiss text", function() {
                    // If I was internationalizing text in the app,
                    // I'd be checking for an internationalization effort here
                    // rather than a hardcoded string. In react-intl,
                    // this typically means looking for a FormattedMessage
                    // element.
                    expect(this.subject.innerText).toEqual("Dismiss");
                });

                it("assigns the onclick handler to onDismiss", function(){
                    expect(this.subject.onclick).toBe(this.instance.onDismiss);
                });
            });
        });
    });

    describe("when there is already a rendered element", function() {
        beforeEach(function() {
            this.dummy = "A dummy element";
            this.instance.$el = this.dummy;
        });

        describe("render()", function() {
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