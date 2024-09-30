class Node {
    data;
    left;
    right;

    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
};

class BinarySearchTree {
    root;
    constructor(array, side) {
        if (array.length === 0) {
            this.root = null;
            return;
        }

        if (array.length === 1) {
            this.root = new Node(array[0]);
            this.root.left = null;
            this.root.right = null;
            return;
        }

        side = side || 'L';

        // console.log('side: ', side);
        // console.log(array);
        let middle = 0;
        let la = {};
        let ra = {};

        //if the array does have a exact middle
        if (array.length % 2 !== 0) {
            middle = Math.ceil(array.length/2) - 1;

            la = array.slice(0, middle);
            ra = array.slice(middle + 1, array.length);
        } else {
            switch (side) {
                case 'R':
                    middle = Math.ceil(array.length/2);

                    break;

                default:
                    middle = Math.ceil(array.length/2) - 1;

                    break;
            }

            la = array.slice(0, middle);
            ra = array.slice(middle + 1, array.length);
        }

        // console.log('(>1)parent: ', array[middle]);

        // console.log(la);
        // console.log(ra);

        this.root = new Node(array[middle]);

        this.root.left = new BinarySearchTree(la, 'L').root;

        this.root.right = new BinarySearchTree(ra, 'R').root;
    }

    insert(data) {
        let node = this.root;
        let dummy = new Node(data);

        while(node !== null){
            console.log(node.data);
            if (dummy.data > node.data) {
                if (node.right !== null) {
                    node = node.right;
                } else {
                    node.right = dummy;
                    return;
                }
            } else {
                if (node.left !== null) {
                    node = node.left;
                } else {
                    node.left = dummy;
                    return;
                }
            }
        }
    }

    delete(data) {
        let node = this.root;
        const toDelete = new Node(data);

        while(node !== null) {
            if (toDelete.data > node.data) {
                if (node.right !== null) {
                    if(node.right.data === toDelete.data) {
                        console.log("found");
                        if(node.right.right === null) {
                            node.right = null;
                        } else {
                            console.log("R");
                            let dummy = node.right;
                            console.log(dummy.left);
                            console.log(dummy.right);
                            node.right = dummy.left;
                            node.right.right = dummy.right;
                        }
                        return;
                    } else {
                        node = node.right;
                    }
                }
            } else {
                if (node.left !== null) {
                    if(node.left.data === toDelete.data) {
                        console.log("found");
                        if(node.left.left === null) {
                            node.left = null;
                        } else {
                            console.log("L");
                            let dummy = node.left;
                            console.log(dummy.left);
                            console.log(dummy.right);
                            node.left = dummy.right;
                            node.left.left = dummy.left;

                        }
                        return;
                    } else {
                        node = node.left;
                    }
                }
            }
        }
    }
};


let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 345];
let arr2 = [1, 2, 3, 4, 5, 6, 7];
let arr3 = [2, 5, 8, 10, 12, 15, 18];
let arr4 = [3, 6, 9, 12, 15, 18];
let arr5 = [7, 12, 14, 15, 20, 23, 27, 88];
let arr6 = [20, 30, 32, 34, 36, 40, 50, 60, 65, 70, 75, 80, 85];
arr = arr.
    sort((a, b) => a - b).
    filter((item, index, self) => self.indexOf(item) === index);

const BST = new BinarySearchTree(arr6, 'L');
BST.insert(5);
BST.delete(32);

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

// console.log(BST);

prettyPrint(BST.root);
