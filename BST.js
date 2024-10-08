export class BTNode {
  data;
  left;
  right;

  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
};

export class BinarySearchTree {
  root;
  constructor(array, side, root) {
    if (array.length === 0) {
      this.root = null;
      return;
    }

    if (array.length === 1) {
      this.root = new BTNode(array[0]);
      this.root.left = null;
      this.root.right = null;
      return;
    }

    side = side || 'L';
    root = root || true;

    if(root === true) {
      array = array.
        sort((a, b) => a - b).
        filter((item, index, self) => self.indexOf(item) === index);
    }

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

    this.root = new BTNode(array[middle]);

    this.root.left = new BinarySearchTree(la, 'L', false).root;

    this.root.right = new BinarySearchTree(ra, 'R', false).root;
  }
  insert(data) {
    let node = this.root;
    let dummy = new BTNode(data);

    while(node !== null){
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
    let dummy;
    const deleted = new BTNode(data);

    while(node !== null) {
      // if the node to be deleted is greater than the node
      if (deleted.data > node.data) {
        // if the right node is null
        if (node.right === null) {
          return null;
        }

        //in case that the node is found
        if (node.right.data === deleted.data) {
          // if is a leaf node
          if (node.right.left === null && node.right.right === null) {
            node.right = null;
            return deleted;
          }
          // if has a two childs
          if ((node.right.left !== null) && (node.right.right !== null)) {
            let is = this.inorderSucessor(data);
            this.delete(is);
            node.right.data = is;

            return;
          }
          //if only has one child
          if (node.right.left !== null) {
            dummy = node.right.left;
            node.right = dummy;

            return deleted;
          } else {
            dummy = node.right.left;
            node.right = dummy;

            return deleted;
          }
        }

        node = node.right;
      } else {
        // if the left node is null
        if (node.left === null) {
          return null;
        }

        //in case that the node is found
        if (node.left.data === deleted.data) {
          // if is a leaf node
          if (node.left.left === null && node.left.right === null) {
            node.left = null;
            return deleted
          }
          //if has two childs
          if ((node.left.left !== null) && (node.left.right !== null)) {
            let is = this.inorderSucessor(data);
            this.delete(is);
            node.left.data = is;

            return;
          }
          //if only has one child
          if (node.left.left !== null) {
            dummy = node.left.left;
            node.left = dummy;

            return deleted;
          } else {
            dummy = node.left.right;
            node.left = dummy;

            return deleted;
          }
        }

        node = node.left;
      }
    }

    return deleted;
  }
  find(data) {
    let node = this.root;
    let toFind = new BTNode(data);
    while(node !== null) {

      if(node.data === toFind.data) {
        return node;
      }

      if(node.data > toFind.data) {
        node = node.left;
      } else {
        node = node.right;
      }
    }

    return null;
  }
  levelOrder(callback) {
    // false queue to keep track of the nodes
    let fqueue = [];
    let node = this.root;

    fqueue.push(node);
    while(fqueue.length > 0) {

      node = fqueue.shift();
      callback(node.data);

      if (node.left !== null) {
        fqueue.push(node.left);
      }

      if (node.right !== null) {
        fqueue.push(node.right);
      }
    }
  }
  inOrder(node, callback) {
    if(node === null) { return null; }

    this.inOrder(node.left, callback);

    callback(node.data);

    this.inOrder(node.right, callback)
  }
  preOrder(node, callback) {
    if(node === null) { return; }

    callback(node.data);

    this.preOrder(node.left, callback);
    this.preOrder(node.right, callback);
  }
  postOrder(node, callback) {
    if (node === null) {return;}

    this.postOrder(node.left, callback)
    this.postOrder(node.right, callback)

    callback(node.data);
  }
  depth(node) {
    let _depth = 0;
    let _node = this.root;
    let dnode = new BTNode(node);


    while(_node !== null) {
      if(_node.data === dnode.data) {
        return _depth;
      }

      if(_node.data > dnode.data) {
        _node = _node.left;
      } else {
        _node = _node.right;
      }

      _depth++;
    }

    return -1;
  }
  height(node) {
    let _height = 0;

    //for the first iteration of the function
    if(typeof node === 'number') {
      node = this.find(node);
      console.log(node);
    }

    if(node === null) { return -1; }

    let lh = this.height(node.left);
    let rh = this.height(node.right);

    _height = (lh > rh) ? lh : rh;
    _height++;

    if(node === node) { return _height; }
    return _height;
  }
  isBalanced() {
    let lh = this.height(this.root.left);
    let rh = this.height(this.root.right);

    // if the heights are greater than the other by one
    if( lh > rh + 1 || rh > lh + 1 ) {
      return false;
    }

    return true;
  }
  balance() {
    let inorder_arr = [];

    this.inOrder(this.root, (node) => { inorder_arr.push(node); })

    this.root = new BinarySearchTree(inorder_arr).root;
  }
  inorderSucessor(data) {
    let prev = null;
    let actual = null;
    let _succesor = null;

    this.inOrder(this.root, (node) => {
      actual = node;
      if(prev === data) {
        _succesor = actual;
      };

      prev = actual;
    });

    return _succesor;
  }
  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
};
