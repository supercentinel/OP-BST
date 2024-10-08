import { assertEquals } from "jsr:@std/assert"
import { BinarySearchTree } from "./BST.js"

let rarr = Array.from(
  {length: 100},
  () => Math.floor(Math.random() * 100));

const BST = new BinarySearchTree(rarr);
BST.prettyPrint(BST.root);
console.log(rarr);

Deno.test("Builded Tree is balanced", () => {
  assertEquals(BST.isBalanced(), true);
});

Deno.test("Level order traversal", () => {
   console.log(BST.levelOrder((node) => { console.log(node) }));
});

Deno.test("PreOrder traversal", () => {
   console.log(BST.preOrder(BST.root, (node) => { console.log(node) }));
});

Deno.test("postOrder traversal", () => {
   console.log(BST.preOrder(BST.root, (node) => { console.log(node) }));
});

Deno.test("InOrder traversal", () => {
   console.log(BST.inOrder(BST.root, (node) => { console.log(node) }));
});

Deno.test("BSTree is now unbalanced", () => {
  let rarr2 = Array.from(
    {length: 200},
    () => Math.floor(Math.random() * 100));

  rarr2.forEach((n) => { BST.insert(n) });

  assertEquals(BST.isBalanced(), false);
});

Deno.test("Rebalance Tree", () => {
  BST.balance();
  assertEquals(BST.isBalanced(), true);
});

Deno.test("Level order traversal", () => {
   console.log(BST.levelOrder((node) => { console.log(node) }));
});

Deno.test("PreOrder traversal", () => {
   console.log(BST.preOrder(BST.root, (node) => { console.log(node) }));
});

Deno.test("postOrder traversal", () => {
   console.log(BST.preOrder(BST.root, (node) => { console.log(node) }));
});

Deno.test("InOrder traversal", () => {
   console.log(BST.inOrder(BST.root, (node) => { console.log(node) }));
});
