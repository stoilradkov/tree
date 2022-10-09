import { TokenType, Token } from "../Token";
import { Operator } from "./Operator";

export class DivideOperator extends Operator {
    #symbol: string;

    constructor(symbol: string) {
        super();
        this.#symbol = symbol;
    }

    public getPriority(): number {
        return 3;
    }

    public get symbol(): string {
        return this.#symbol;
    }

    public execute(left: number, right: number): number {
        if (right === 0) {
            throw new Error("Illegal division");
        }

        return left / right;
    }
}

export class DivideOperatorType implements TokenType {
    public isOfType(symbol: string): boolean {
        return symbol === "÷";
    }

    public build(symbol: string): Token {
        return new DivideOperator(symbol);
    }
}

export default new DivideOperatorType();
