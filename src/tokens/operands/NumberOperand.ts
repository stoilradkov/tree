import { isNumber } from "../../utils/numbers";
import { TokenType, Token } from "../Token";
import { Operand } from "./Operand";

export class NumberOperand extends Operand {
    #symbol: string;

    constructor(symbol: string) {
        super();
        this.#symbol = symbol;
    }

    public get value(): number {
        return +this.#symbol;
    }

    public get symbol(): string {
        return this.#symbol;
    }
}

export class NumberOperandType implements TokenType {
    public isOfType(symbol: string): boolean {
        return isNumber(symbol);
    }

    public build(symbol: string): Token {
        return new NumberOperand(symbol);
    }
}

export default new NumberOperandType();
