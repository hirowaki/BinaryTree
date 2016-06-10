'use strict';

const assert = require('assert');
const Tree = require('./../lib/LLRBTree').Tree;

describe('LLRBTreeTest.', function () {
    describe('constructor', function () {
        it('simple call', function () {
            const tree = new Tree;

            assert.strictEqual(tree._root, null);
        });
    });

    describe('3 elements, balanced', function () {
        it('these cases should be balanced', function () {
            // insert.
            [
                [1, 3, 5],
                [1, 5, 3],
                [3, 1, 5],
                [3, 5, 1],
                [5, 1, 3],
                [5, 3, 1]
            ].forEach(function (testCase) {
                const tree = new Tree;

                testCase.forEach(function (key) {
                    tree.insert(key, "DATA " + key);
                });

                // all cases should be balanced.

                //    3
                //  1   5
                assert.deepEqual(tree._root, {
                    _key: 3,
                    _data: 'DATA 3',
                    _red: false,    // ROOT MUST ALWAYS BE BLACK.
                    _left: {
                        _key: 1,
                        _data: 'DATA 1',
                        _red: false
                    },
                    _right: {
                        _key: 5,
                        _data: 'DATA 5',
                        _red: false
                    }
                });

                assert.strictEqual(tree.depth(), 2);
            });
        });
    });

    describe('7 elements, balanced', function () {
        it('these cases should be balanced', function () {
            // insert.
            [
                [1, 2, 3, 4, 5, 6, 7],
                [1, 7, 2, 6, 3, 5, 4],
                [1, 4, 7, 2, 5, 3, 6],
                [7, 6, 5, 4, 3, 2, 1],
                [4, 5, 3, 6, 2, 7, 1]
            ].forEach(function (testCase) {
                const tree = new Tree;

                testCase.forEach(function (key) {
                    tree.insert(key, "DATA " + key);
                });

                // all above cases should be balanced.

                assert.deepEqual(tree._root, {
                    _key: 4,
                    _data: 'DATA 4',
                    _red: false,    // ROOT MUST ALWAYS BE BLACK.
                    _left: {
                        _key: 2,
                        _data: 'DATA 2',
                        _red: false,
                        _left: {
                            _key: 1,
                            _data: 'DATA 1',
                            _red: false
                        },
                        _right: {
                            _key: 3,
                            _data: 'DATA 3',
                            _red: false
                        }
                    },
                    _right: {
                        _key: 6,
                        _data: 'DATA 6',
                        _red: false,
                        _left: {
                            _key: 5,
                            _data: 'DATA 5',
                            _red: false
                        },
                        _right: {
                            _key: 7,
                            _data: 'DATA 7',
                            _red: false
                        }
                    }
                });

                assert.strictEqual(tree.depth(), 3);
            });
        });
    });
});
