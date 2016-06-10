'use strict';

// node.
//  key should be integer.
class SimpleBinaryTreeNode {
    constructor(key, data) {
        this._key = key;
        this._data = data;
    }

    get key() {
        return this._key;
    }

    get data() {
        return this._data;
    }

    set left(node) {
        if (node) {
            this._left = node;
        }
        else {
            delete this._left;
        }
    }

    get left() {
        return this._left || null;
    }

    set right(node) {
        if (node) {
            this._right = node;
        }
        else {
            delete this._right;
        }
    }

    get right() {
        return this._right || null;
    }

    compareKey(key) {
        return this.key - key;
    }

    updateData(data) {
        this._data = data;
    }
}

// tree.
class SimpleBinaryTree {
    constructor() {
        this._root = null;
    }

    // public functions.

    insert(key, data) {
        this._root = this.constructor._insert(this._root, key, data);
    }

    lookup(key) {
        return this.constructor._lookup(this._root, key);
    }

    depth() {
        return this.constructor._depth(this._root);
    }

    // static private functions.

    static _createNode(key, data) {
        return this.onCreate(key, data);
    }

    static _insert(node, key, data) {
        if (!node) {
            return this._createNode(key, data);
        }

        const res = node.compareKey(key);
        if (res > 0) {
            // new data is smaller than node.
            node.left = this._insert(node.left, key, data);
        }
        else if (res < 0) {
            // new data is bigger than node.
            node.right = this._insert(node.right, key, data);
        }
        else {
            // overwrite.
            node.updateData(data);
        }

        return this.onInsertedNode(node);
    }

    static _lookup(node, key) {
        if (node) {
            const res = node.compareKey(key);
            if (res > 0) {
                return this._lookup(node.left, key);
            }
            else if (res < 0) {
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

    static onCreate(key, data) {
        return new SimpleBinaryTreeNode(key, data);
    }

    static onInsertedNode(node) {
        return node;
    }
}

module.exports = {
    Tree: SimpleBinaryTree,
    Node: SimpleBinaryTreeNode
};
