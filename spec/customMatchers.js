Absorb.GroceryCo.Checkout.Test = {
    customMatchers: {
        toHaveTagName(util, customEqualityTesters) {
            return {
                compare($element, tagName) {
                    const expected = tagName.toLowerCase();
                    const actual = $element.tagName.toLowerCase();
                    const result = {
                        pass: util.equals(actual, expected, customEqualityTesters)
                    };
                    if (result.pass) {
                        result.message = `Expected element to not be <${actual}>`;
                    } else {
                        result.message = `Expected element <${expected}> to be <${actual}>`;
                    }
                    return result;
                }
            };
        },
        toHaveCssClass() {
            return {
                compare($element, className) {
                    const result = {
                        pass: $element.classList.contains(className)
                    };
                    if (result.pass) {
                        result.message = `Expected element to not have class ${className}`;
                    } else {
                        result.message = `Expected element to have class ${className}; actual classes are: '${$element.className}'`;
                    }
                    return result;
                }
            };
        },
    }
};

beforeEach(function() {
    jasmine.addMatchers(Absorb.GroceryCo.Checkout.Test.customMatchers);
});