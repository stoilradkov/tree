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

        describe("with single number expression", () => {
            it("should return correct value when a positive integer is passed", () => {
                expect(new Tree("3").result()).to.equal(3);
            });

            it("should return correct value when a positive integer with plus sign is passed", () => {
                expect(new Tree("+3").result()).to.equal(3);
            });

            it("should return correct value when a negative integer is passed", () => {
                expect(new Tree("-3").result()).to.equal(-3);
            });

            it("should return correct value when a positive float value is passed", () => {
                expect(new Tree("3.5").result()).to.equal(3.5);
            });

            it("should return correct value when a positive float value with plus sign is passed", () => {
                expect(new Tree("+3.5").result()).to.equal(3.5);
            });

            it("should return correct value when a negative float value is passed", () => {
                expect(new Tree("-3.5").result()).to.equal(-3.5);
            });

            it("should return correct value when a float value without leading number is passed", () => {
                expect(new Tree(".5").result()).to.equal(0.5);
            });

            it("should return correct value when a float value with plus sign without leading number is passed", () => {
                expect(new Tree("+.5").result()).to.equal(0.5);
            });

            it("should return correct value when a negative float value sign without leading number is passed", () => {
                expect(new Tree("-.5").result()).to.equal(-0.5);
            });
        });

        describe("add", () => {
            it("should return correct value when adding two integers", () => {
                expect(new Tree("1+2").result()).to.equal(3);
            });

            it("should return correct value when adding multiple integers", () => {
                expect(new Tree("1+2+3+4").result()).to.equal(10);
            });

            it("should ignore whitespaces", () => {
                expect(new Tree("  1+ 2  +3  ").result()).to.equal(6);
            });

            it("should add correctly float values", () => {
                expect(new Tree("1.5+1.5").result()).to.equal(3);
            });

            it("should add correctly positive signed values", () => {
                expect(new Tree("1.5 + +3 + +.5").result()).to.equal(5);
            });

            it("should add correctly negative signed values", () => {
                expect(new Tree("3 + -1 +-2").result()).to.equal(0);
            });
        });

        describe("subtract", () => {
            it("should return correct value when subtracting two integers", () => {
                expect(new Tree("3-2").result()).to.equal(1);
            });

            it("should return correct value when subtracting multiple integers", () => {
                expect(new Tree("10-4-3-2-1").result()).to.equal(0);
            });

            it("should ignore whitespaces", () => {
                expect(new Tree("  1- 2  - 3  ").result()).to.equal(-4);
            });

            it("should subtract correctly float values", () => {
                expect(new Tree("2.5-1.5").result()).to.equal(1);
            });

            it("should subtract correctly positive signed values", () => {
                expect(new Tree("4.5 - +3 - +.5").result()).to.equal(1);
            });

            it("should subtract correctly negative signed values", () => {
                expect(new Tree("3 - -1    --2").result()).to.equal(6);
            });
        });

        describe("multiply", () => {
            it("should return correct value when multiplying two integers", () => {
                expect(new Tree("3x2").result()).to.equal(6);
            });

            it("should return correct value when multiplying multiple integers", () => {
                expect(new Tree("1x2x3x4").result()).to.equal(24);
            });

            it("should ignore whitespaces", () => {
                expect(new Tree("1 x 2 x    3").result()).to.equal(6);
            });

            it("should multiply correctly float values", () => {
                expect(new Tree("2.5x2.5").result()).to.equal(6.25);
            });

            it("should multiply correctly positive signed values", () => {
                expect(new Tree("+3x +5").result()).to.equal(15);
            });

            it("should multiply correctly negative signed values", () => {
                expect(new Tree("-2 x -3").result()).to.equal(6);
            });
        });

        describe("divide", () => {
            it("should return correct value when dividing two integers", () => {
                expect(new Tree("6÷3").result()).to.equal(2);
            });

            it("should return correct value when dividing multiple integers", () => {
                expect(new Tree("16÷4÷2").result()).to.equal(2);
            });

            it("should ignore whitespaces", () => {
                expect(new Tree("4   ÷  2").result()).to.equal(2);
            });

            it("should divide correctly float values", () => {
                expect(new Tree("10.5÷2.5").result()).to.equal(4.2);
            });

            it("should divide correctly positive signed values", () => {
                expect(new Tree("+10÷+2").result()).to.equal(5);
            });

            it("should divide correctly negative signed values", () => {
                expect(new Tree("-6÷-2").result()).to.equal(3);
            });

            it("should throw an  error when dividing by zero", () => {
                expect(() => new Tree("6÷0").result()).to.throw("Illegal division");
            });
        });

        describe("expression with multiple operators", () => {
            it("should consider operator priority", () => {
                expect(new Tree("2+3x4").result()).to.equal(14);
                expect(new Tree("4-4÷2").result()).to.equal(2);
            });

            it("should consider brackets priority", () => {
                expect(new Tree("(3-1)x4").result()).to.equal(8);
                expect(new Tree("10÷(7-1x2)").result()).to.equal(2);
            });

            it("should return correct value for an arbitrary expression", () => {
                expect(new Tree("((7 + ((3 - 2) x 5)) ÷ 6)").result()).to.equal(2);
            });
        });
    });

    describe("toString", () => {
        describe("with single number expression", () => {
            it("should return correct value when a positive integer is passed", () => {
                expect(new Tree("3").toString()).to.equal("3");
            });

            it("should return correct value when a positive integer with plus sign is passed", () => {
                expect(new Tree("+3").toString()).to.equal("+3");
            });

            it("should return correct value when a negative integer is passed", () => {
                expect(new Tree("-3").toString()).to.equal("-3");
            });

            it("should return correct value when a positive float value is passed", () => {
                expect(new Tree("3.5").toString()).to.equal("3.5");
            });

            it("should return correct value when a positive float value with plus sign is passed", () => {
                expect(new Tree("+3.5").toString()).to.equal("+3.5");
            });

            it("should return correct value when a negative float value is passed", () => {
                expect(new Tree("-3.5").toString()).to.equal("-3.5");
            });

            it("should return correct value when a float value without leading number is passed", () => {
                expect(new Tree(".5").toString()).to.equal(".5");
            });

            it("should return correct value when a float value with plus sign without leading number is passed", () => {
                expect(new Tree("+.5").toString()).to.equal("+.5");
            });

            it("should return correct value when a negative float value sign without leading number is passed", () => {
                expect(new Tree("-.5").toString()).to.equal("-.5");
            });
        });
    });
});
