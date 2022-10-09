import { TokenType, Token } from "../Token";
import { Operator } from "./Operator";

export class AddOperator extends Operator {
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
        return left + right;
    }
}

export class AddOperatorType implements TokenType {
    public isOfType(symbol: string): boolean {
        return symbol === "+";
    }

    public build(symbol: string): Token {
        return new AddOperator(symbol);
    }
}

export default new AddOperatorType();
