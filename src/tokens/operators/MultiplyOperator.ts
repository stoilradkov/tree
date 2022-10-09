import { TokenType, Token } from "../Token";
import { Operator } from "./Operator";

export class MultiplyOperator extends Operator {
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
        return left * right;
    }
}

export class MultiplyOperatorType implements TokenType {
    public isOfType(symbol: string): boolean {
        return symbol === "x";
    }

    public build(symbol: string): Token {
        return new MultiplyOperator(symbol);
    }
}

export default new MultiplyOperatorType();
