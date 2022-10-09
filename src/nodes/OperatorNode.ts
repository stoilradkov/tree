import { Operator } from "../tokens/operators/Operator";
import { Node } from "./Node";

export class OperatorNode implements Node {
    #token: Operator;
    #left: Node;
    #right: Node;

    constructor(token: Operator, left: Node, right: Node) {
        this.#token = token;
        this.#left = left;
        this.#right = right;
    }

    public result(): number {
        return this.#token.execute(this.#left.result(), this.#right.result());
    }

    public toString(): string {
        return `(${this.#left.toString()} ${this.#token.symbol} ${this.#right.toString()})`;
    }
}
