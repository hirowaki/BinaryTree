'use strict';

const assert = require('assert');
const sinon = require('sinon');
const Tree = require('./../lib/SimpleBinaryTree').Tree;

describe('SimpleBinaryTree.', function () {
    let sandbox;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('constructor', function () {
        it('simple call', function () {
            const tree = new Tree;

            assert.strictEqual(tree._root, null);
        });
    });

    describe('lookup, depth against empty tree.', function () {
        it('simple call', function () {
            const tree = new Tree;

            assert.strictEqual(tree._root, null);
            assert.strictEqual(tree.lookup(1), null);
            assert.strictEqual(tree.depth(), 0);
        });
    });

    describe('insert, lookup', function () {
        let tree;
        let spyLookup;

        beforeEach(function () {
            tree = new Tree;
            spyLookup = sandbox.spy(Tree, '_lookup');
        });

        it('3 elements, balanced', function () {
            // insert.
            tree.insert(3, 'DATA 3');   // 3
            tree.insert(1, 'DATA 1');   // 1
            tree.insert(5, 'DATA 5');   // 5

            //    3
            //  1   5
            assert.deepEqual(tree._root, {
                _key: 3,
                _data: 'DATA 3',
                _left: {
                    _key: 1,
                    _data: 'DATA 1'
                },
                _right: {
                    _key: 5,
                    _data: 'DATA 5'
                }
            });

            assert.strictEqual(tree.depth(), 2);

            // lookup.
            const testCases = [
                // search key 1. tracing 2 nodes.
                {key: 1, expected: 'DATA 1', traceCount: 2},
                // search key 2. tracing 3 nodes.
                {key: 2, expected: null, traceCount: 3},
                // search key 3. tracing only 1 node.
                {key: 3, expected: 'DATA 3', traceCount: 1},
                // search key 4. tracing 3 nodes.
                {key: 4, expected: null, traceCount: 3},
                // search key 5. tracing 2 nodes.
                {key: 5, expected: 'DATA 5', traceCount: 2}
            ];
            testCases.forEach(function (testCase) {
                assert.strictEqual(tree.lookup(testCase.key), testCase.expected);
                assert.strictEqual(spyLookup.callCount, testCase.traceCount);
                spyLookup.reset();
            });
        });

        it('4 elements, balanced', function () {
            tree.insert(3, 'DATA 3');   // 3
            tree.insert(1, 'DATA 1');   // 1
            tree.insert(2, 'DATA 2');   // 2
            tree.insert(4, 'DATA 4');   // 4

            //    3
            //  1   4
            // N 2
            assert.deepEqual(tree._root, {
                _key: 3,
                _data: 'DATA 3',
                _left: {
                    _key: 1,
                    _data: 'DATA 1',
                    _right: {
                        _key: 2,
                        _data: 'DATA 2'
                    }
                },
                _right: {
                    _key: 4,
                    _data: 'DATA 4'
                }
            });

            assert.strictEqual(tree.depth(), 3);

            // lookup.
            const testCases = [
                // search key 1. tracing 2 nodes.
                {key: 1, expected: 'DATA 1', traceCount: 2},
                // search key 2. tracing 3 nodes.
                {key: 2, expected: 'DATA 2', traceCount: 3},
                // search key 3. tracing only 1 node.
                {key: 3, expected: 'DATA 3', traceCount: 1},
                // search key 4. tracing 2 nodes.
                {key: 4, expected: 'DATA 4', traceCount: 2},
                // search key 5. tracing 3 nodes.
                {key: 5, expected: null, traceCount: 3}
            ];
            testCases.forEach(function (testCase) {
                assert.strictEqual(tree.lookup(testCase.key), testCase.expected);
                assert.strictEqual(spyLookup.callCount, testCase.traceCount);
                spyLookup.reset();
            });
        });

        it('5 elements, balanced', function () {
            tree.insert(3, 'DATA 3');   // 3
            tree.insert(1, 'DATA 1');   // 1
            tree.insert(2, 'DATA 2');   // 2
            tree.insert(4, 'DATA 4');   // 4
            tree.insert(5, 'DATA 5');   // 5

            //    3
            //  1   4
            // N 2 N 5
            assert.deepEqual(tree._root, {
                _key: 3,
                _data: 'DATA 3',
                _left: {
                    _key: 1,
                    _data: 'DATA 1',
                    _right: {
                        _key: 2,
                        _data: 'DATA 2'
                    }
                },
                _right: {
                    _key: 4,
                    _data: 'DATA 4',
                    _right: {
                        _key: 5,
                        _data: 'DATA 5'
                    }
                }
            });

            assert.strictEqual(tree.depth(), 3);

            // lookup.
            const testCases = [
                // search key 1. tracing 2 nodes.
                {key: 1, expected: 'DATA 1', traceCount: 2},
                // search key 2. tracing 3 nodes.
                {key: 2, expected: 'DATA 2', traceCount: 3},
                // search key 3. tracing only 1 node.
                {key: 3, expected: 'DATA 3', traceCount: 1},
                // search key 4. tracing 2 nodes.
                {key: 4, expected: 'DATA 4', traceCount: 2},
                // search key 5. tracing 3 nodes.
                {key: 5, expected: 'DATA 5', traceCount: 3},
                // search key 6. tracing 4 nodes.
                {key: 6, expected: null, traceCount: 4}
            ];
            testCases.forEach(function (testCase) {
                assert.strictEqual(tree.lookup(testCase.key), testCase.expected);
                assert.strictEqual(spyLookup.callCount, testCase.traceCount);
                spyLookup.reset();
            });
        });
    });

    describe('insert, error case.', function () {
        it('trying to insert the same key should get an exeption.', function () {
            const tree = new Tree;
            // insert.
            assert.strictEqual(tree.insert(1, "DATA 1"), this._root);

            // insert will overrite.
            assert.strictEqual(tree.insert(1, "OVER WRITTEN"), this._root);
            assert.strictEqual(tree.lookup(1), "OVER WRITTEN");
        });
    });
});

