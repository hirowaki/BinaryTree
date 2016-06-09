'use strict';

// SimpleBinaryTree.
// The basic one.
// node has
//   data: {
//     key: key,    // primary key. must be unique. Integer for this SimpleBinaryTree.
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

    lookup(key) {
        return this.constructor._lookup(this._root, key);
    }

    depth() {
        return this.constructor._depth(this._root);
    }

    // static private functions.

    static _createNode(data) {
        const node = {
            data: data
        };

        return this.onCreated(node);
    }

    static _insert(node, data) {
        if (!node) {
            return this._createNode(data);
        }

        var res = this.onCompareKey(node.data.key, data.key);
        if (res < 0) {
            node.left = this._insert(node.left, data);
            return this.onInserted(node);
        }
        else if (res > 0) {
            node.right = this._insert(node.right, data);
            return this.onInserted(node);
        }

        // overwrite.
        node.data = data;
        return node;
    }

    static _lookup(node, key) {
        if (node) {
            const data = node.data;

            var res = this.onCompareKey(data.key, key);
            if (res < 0) {
                return this._lookup(node.left, key);
            }
            else if (res > 0) {
                return this._lookup(node.right, key);
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

    static onCreated(node) {
        return node;
    }

    static onInserted(node) {
        return node;
    }

    static onCompareKey(nodeKey, insertKey) {
        return insertKey - nodeKey;
    }
}

module.exports = SimpleBinaryTree;
