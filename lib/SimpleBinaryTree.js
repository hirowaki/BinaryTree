'use strict';

// SimpleBinaryTree.
// The basic one.
// node has
//   data: {
//     id: id,  // primary key. must be unique.
//     body: dataBody,
//   }
class SimpleBinaryTree {
    constructor() {
        this._root = null;
    }

    // public functions.

    insert(data) {
        this._root = this.constructor._insert(this._root, data);
    }

    lookup(id) {
        return this.constructor._lookup(this._root, id);
    }

    depth() {
        return this.constructor._depth(this._root);
    }

    // static private functions.

    static _createNode(data) {
        return {
            data: data
        };
    }

    static _insert(node, data) {
        if (!node) {
            return this._createNode(data);
        }
        else {
            if (data.id < node.data.id) {
                node.left = this._insert(node.left, data);
            }
            else {
                node.right = this._insert(node.right, data);
            }

            throw new Error(`data.id should be unique. ${data.id}`);
        }
    }

    static _lookup(node, id) {
        if (node) {
            const data = node.data;

            if (id < data.id) {
                return this._lookup(node.left, id);
            }
            else if (id > data.id) {
                return this._lookup(node.right, id);
            }
            // found.
            return node.data;
        }
        return null;
    }

    static _depth(node) {
        if (node) {
            const left = this._depth(node.left);
            const right = this._depth(node.right);

            return Math.max(left, right) + 1;
        }
        return 0;
    }
}

module.exports = SimpleBinaryTree;
