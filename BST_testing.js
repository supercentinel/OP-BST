import { BTNode, BinarySearchTree } from "./BST.js"

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 345];
let arr2 = [1, 2, 3, 4, 5, 6, 7];
let arr3 = [2, 5, 8, 10, 12, 15, 18];
let arr4 = [3, 6, 9, 12, 15, 18];
let arr5 = [7, 12, 14, 15, 20, 23, 27, 88];
let arr6 = [20, 30, 32, 34, 36, 40, 50, 60, 65, 70, 75, 80, 85];

const BST = new BinarySearchTree(arr, 'L');

BST.prettyPrint(BST.root);
//BST.insert(5);
BST.delete(32);
//console.log(BST.find(75));
//console.log("level order traversal:")
//BST.levelOrder((node) => { console.log(node) });
//console.log("InOrder traversal")
//let inarr = [];
//BST.inOrder(BST.root, (node) => { inarr.push(node)} );
//console.log(inarr);
//console.log("PreOrder traversal")
//BST.preOrder(BST.root, (node) => { console.log(node) });
//console.log("PostOrder traversal")
//BST.postOrder(BST.root, (node) => { console.log(node) } );
//console.log(BST.depth(75));
//console.log(BST.height(75));
//BST.insert(61);
//BST.insert(62);
//BST.insert(18);
//BST.insert(17);
//BST.insert(16);
//console.log(BST.isBalanced());
//console.log(BST.inorderSucessor(32));

// console.log(BST);

//BST.balance();
console.log(BST.isBalanced());
BST.prettyPrint(BST.root);
