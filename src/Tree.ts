import { Node } from "./nodes/Node";
import { OperandNode } from "./nodes/OperandNode";
import { OperatorNode } from "./nodes/OperatorNode";
import { Bracket } from "./tokens/brackets/Bracket";
import { createToken } from "./tokens/createToken";
import { Operator } from "./tokens/operators/Operator";
import { parseExpression } from "./utils/parseExpression";

export class Tree {
    #root: Node;

    constructor(epxression: string) {
        this.#root = this.buildTree(epxression);
    }

    public result() {
        return this.#root.result();
    }

    public toString() {
        return this.#root.toString();
    }

    private buildTree(expression: string) {
        const operators: (Operator | Bracket)[] = [];
        const stack: Node[] = [];

        const parsedExpression = parseExpression(expression);
        if (parsedExpression.length === 0) {
            throw new Error("Invalid expression");
        }

        for (const item of parsedExpression) {
            const token = createToken(item);

            if (token.isBracket() && token.symbol === "(") {
                operators.push(token);
            } else if (token.isOperand()) {
                stack.push(new OperandNode(token));
            } else if (token.symbol === ")") {
                if (operators.length === 0) {
                    throw new Error("Invalid expression");
                }
                while (operators[operators.length - 1].symbol !== "(") {
                    stack.push(this.combine(operators, stack));
                }

                operators.pop();
            } else if (token.isOperator()) {
                while (operators.length !== 0 && operators[operators.length - 1].getPriority() >= token.getPriority()) {
                    stack.push(this.combine(operators, stack));
                }

                operators.push(token);
            }
        }

        if (stack.length === 0) {
            throw new Error("Invalid expression");
        }

        while (stack.length > 1) {
            stack.push(this.combine(operators, stack));
        }

        return stack[0];
    }

    private combine(operators: (Operator | Bracket)[], stack: Node[]) {
        const rootToken = operators.pop();
        const rightNode = stack.pop();
        const leftNode = stack.pop();
        if (rootToken === undefined || !rootToken.isOperator() || rightNode === undefined || leftNode === undefined) {
            throw new Error("Invalid expression");
        }

        return new OperatorNode(rootToken as Operator, leftNode, rightNode);
    }
}
