var noopable = require(".."),
    expect = require("expect.js"),
    sinon = require("sinon");

describe("noopable", function() {
    describe("(function)", function() {
        it("should return noopable function", function() {
            var spy = sinon.spy(),
                fn = noopable(spy);

            expect(fn).to.be.a("function");
            expect(fn.enable).to.be.a("function");
            expect(fn.disable).to.be.a("function");
            expect(fn).to.not.be(spy);

            fn();
            expect(spy.calledOnce).to.be(true);

            fn.disable();
            fn();
            expect(spy.calledOnce).to.be(true);

            fn.enable();
            fn();
            expect(spy.calledTwice).to.be(true);            
        });
    });

    describe("(object, string)", function() {
        it("should make object method noopable", function() {
            var obj = {method: sinon.spy()},
                spy = obj.method;

            noopable(obj, "method");
            expect(obj.method.enable).to.be.a("function");
            expect(obj.method.disable).to.be.a("function");
            expect(obj.method.restore).to.be.a("function");
            expect(obj.method).to.not.be(spy);

            obj.method.restore();
            expect(obj.method).to.be(spy);            
        });

        it("should return bound function", function(done) {
            var obj = {},
                fn

            obj.method = function() {
                expect(this).to.be(obj);
                done();
            };

            fn = noopable(obj, "method");
            fn();
        });
    });
});
