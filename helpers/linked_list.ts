export class Node<T> {
  value: T;
  right: Node<T> | undefined;
  left: Node<T> | undefined;
  constructor(value: T) {
    this.value = value;
    this.left = this;
    this.right = this;
  }
}

export function pushValue<T>(value: T, head: Node<T> | undefined) {
  const newNode = new Node<T>(value);
  if (head) {
    newNode.right = head;
    newNode.left = head.left!.right;
    head.left!.right = newNode;
    head.left = newNode;
  }
  return newNode;
}
