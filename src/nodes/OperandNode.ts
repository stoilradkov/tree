import { Operand } from "../tokens/operands/Operand";
import { Node } from "./Node";

export class OperandNode implements Node {
    #token: Operand;

    constructor(token: Operand) {
        this.#token = token;
    }

    public result() {
        return this.#token.value;
    }

    public toString(): string {
        return this.#token.symbol;
    }
}
