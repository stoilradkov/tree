import { expect } from "chai";
import { Tree } from "./Tree";

describe("Tree", () => {
    describe("result", () => {
        describe("with invalid expression", () => {
            it("should throw an error when an empty expression is passed", () => {
                expect(() => new Tree("").result()).to.throw("Invalid expression");
            });

            it("should throw an error when an invalid number is passed", () => {
                expect(() => new Tree("2,3 + 4,5").result()).to.throw("Unknown token");
            });

            it("should throw an error when an invalid operator is passed", () => {
                expect(() => new Tree("2*3").result()).to.throw("Unknown token");
            });

            it("should throw an error when brackets don't match", () => {
                expect(() => new Tree("(2+3))").result()).to.throw("Invalid expression");
            });

            it("should throw an error when wrong brackets are used", () => {
                expect(() => new Tree("[2+3]").result()).to.throw("Unknown token");
            });

            it("should throw an error when an invalid expression is passed", () => {
                expect(() => new Tree("2+++3").result()).to.throw("Invalid expression");
                expect(() => new Tree("2xx3").result()).to.throw("Invalid expression");
            });
        });
    });
});
