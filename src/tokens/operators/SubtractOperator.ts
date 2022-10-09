import { TokenType, Token } from "../Token";
import { Operator } from "./Operator";

export class SubtractOperator extends Operator {
    #symbol: string;

    constructor(symbol: string) {
        super();
        this.#symbol = symbol;
    }

    public getPriority(): number {
        return 2;
    }

    public get symbol(): string {
        return this.#symbol;
    }

    public execute(left: number, right: number): number {
        return left - right;
    }
}

export class SubtractOperatorType implements TokenType {
    public isOfType(symbol: string): boolean {
        return symbol === "-";
    }

    public build(symbol: string): Token {
        return new SubtractOperator(symbol);
    }
}

export default new SubtractOperatorType();
