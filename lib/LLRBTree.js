'use strict';

const SimpleBinaryTree = require('./SimpleBinaryTree');

// BalancedTree. red/black.
// http://www.cs.princeton.edu/~rs/talks/LLRB/LLRB.pdf
// http://ranger.uta.edu/~kosmopo/cse5311/lectures/LeftLeaningRedBlackTrees.pdf
class LLRBNode extends SimpleBinaryTree.Node{
    constructor(key, data) {
        super(key, data);

        this.redden();
    }

    blacken() {
        this._red = false;
    }

    redden() {
        this._red = true;
    }

    isBlack() {
        return !this._red;
    }

    isRed() {
        return !this.isBlack();
    }

    copyColor(src) {
        this._red = src._red;
    }

    flipColor() {
        this._red = !this._red;
    }
}

class LLRBTree extends SimpleBinaryTree.Tree{
    insert(key, data) {
        super.insert(key, data);

        // root should always be BLACK.
        this._root.blacken();
    }

    static onCreate(key, data) {
        return new LLRBNode(key, data);
    }

    static onInsertedNode(node) {
        function _isRed(_node) {
            return !!(_node && _node.isRed());
        }

        if (_isRed(node.right) && !_isRed(node.left)) {
            node = this._rotateLeft(node);
        }

        if (_isRed(node.left) && _isRed(node.left.left)) {
            node = this._rotateRight(node);
        }

        if (_isRed(node.left) && _isRed(node.right)) {
            node.flipColor();
            node.left.flipColor();
            node.right.flipColor();
        }
        return node;
    }

    static _rotateLeft(node) {
        const _root = node.right;
        node.right = _root.left;
        _root.left = node;

        _root.copyColor(node);
        node.redden();
        return _root;
    }

    static _rotateRight(node) {
        const _root = node.left;
        node.left = _root.right;
        _root.right = node;

        _root.copyColor(node);
        node.redden();
        return _root;
    }
}

module.exports = {
    Tree: LLRBTree,
    Node: LLRBNode
};

