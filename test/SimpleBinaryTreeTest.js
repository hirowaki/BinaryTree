'use strict';

const assert = require('assert');
const sinon = require('sinon');
const SimpleBinaryTree = require('./../lib/SimpleBinaryTree');

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
            const tree = new SimpleBinaryTree;

            assert.strictEqual(tree._root, null);
        });
    });

    describe('lookup, depth against empty tree.', function () {
        it('simple call', function () {
            const tree = new SimpleBinaryTree;

            assert.strictEqual(tree._root, null);
            assert.strictEqual(tree.lookup(1), null);
            assert.strictEqual(tree.depth(), 0);
        });
    });

    describe('insert, lookup', function () {
        const data = [
            {id: 1, body: "DATA 1"},
            {id: 2, body: "DATA 2"},
            {id: 3, body: "DATA 3"},
            {id: 4, body: "DATA 4"},
            {id: 5, body: "DATA 5"}
        ];

        let tree;
        let spyLookup;

        beforeEach(function () {
            tree = new SimpleBinaryTree;
            spyLookup = sandbox.spy(SimpleBinaryTree, '_lookup');
        });

        it('3 elements, balanced', function () {
            // insert.
            tree.insert(data[2]);   // 3
            tree.insert(data[0]);   // 1
            tree.insert(data[4]);   // 5

            //    3
            //  1   5
            assert.deepEqual(tree._root, {
                data: data[2],
                left: {
                    data: data[0]
                },
                right: {
                    data: data[4]
                }
            });

            assert.strictEqual(tree.depth(), 2);

            // lookup.
            const testCases = [
                // search id 1. tracing 2 nodes.
                {id: 1, expected: data[0], traceCount: 2},
                // search id 2. tracing 3 nodes.
                {id: 2, expected: null, traceCount: 3},
                // search id 3. tracing only 1 node.
                {id: 3, expected: data[2], traceCount: 1},
                // search id 4. tracing 3 nodes.
                {id: 4, expected: null, traceCount: 3},
                // search id 5. tracing 2 nodes.
                {id: 5, expected: data[4], traceCount: 2}
            ];
            testCases.forEach(function (testCase) {
                assert.strictEqual(tree.lookup(testCase.id), testCase.expected);
                assert.strictEqual(spyLookup.callCount, testCase.traceCount);
                spyLookup.reset();
            });
        });

        it('4 elements, balanced', function () {
            //    3
            //  1   4
            // N 2
            tree.insert(data[2]);   // 3.
            tree.insert(data[0]);   // 1.
            tree.insert(data[1]);   // 2.
            tree.insert(data[3]);   // 4.

            assert.deepEqual(tree._root, {
                data: data[2],
                left: {
                    data: data[0],
                    right: {
                        data: data[1]
                    }
                },
                right: {
                    data: data[3]
                }
            });

            assert.strictEqual(tree.depth(), 3);

            // lookup.
            const testCases = [
                // search id 1. tracing 2 nodes.
                {id: 1, expected: data[0], traceCount: 2},
                // search id 2. tracing 3 nodes.
                {id: 2, expected: data[1], traceCount: 3},
                // search id 3. tracing only 1 node.
                {id: 3, expected: data[2], traceCount: 1},
                // search id 4. tracing 2 nodes.
                {id: 4, expected: data[3], traceCount: 2},
                // search id 5. tracing 3 nodes.
                {id: 5, expected: null, traceCount: 3}
            ];
            testCases.forEach(function (testCase) {
                assert.strictEqual(tree.lookup(testCase.id), testCase.expected);
                assert.strictEqual(spyLookup.callCount, testCase.traceCount);
                spyLookup.reset();
            });
        });

        it('5 elements, balanced', function () {
            //    3
            //  1   4
            // N 2 N 5
            tree.insert(data[2]);   // 3.
            tree.insert(data[0]);   // 1.
            tree.insert(data[1]);   // 2.
            tree.insert(data[3]);   // 4.
            tree.insert(data[4]);   // 5.

            assert.deepEqual(tree._root, {
                data: data[2],
                left: {
                    data: data[0],
                    right: {
                        data: data[1]
                    }
                },
                right: {
                    data: data[3],
                    right: {
                        data: data[4]
                    }
                }
            });

            assert.strictEqual(tree.depth(), 3);

            // lookup.
            const testCases = [
                // search id 1. tracing 2 nodes.
                {id: 1, expected: data[0], traceCount: 2},
                // search id 2. tracing 3 nodes.
                {id: 2, expected: data[1], traceCount: 3},
                // search id 3. tracing only 1 node.
                {id: 3, expected: data[2], traceCount: 1},
                // search id 4. tracing 2 nodes.
                {id: 4, expected: data[3], traceCount: 2},
                // search id 5. tracing 3 nodes.
                {id: 5, expected: data[4], traceCount: 3},
                // search id 6. tracing 4 nodes.
                {id: 6, expected: null, traceCount: 4}
            ];
            testCases.forEach(function (testCase) {
                assert.strictEqual(tree.lookup(testCase.id), testCase.expected);
                assert.strictEqual(spyLookup.callCount, testCase.traceCount);
                spyLookup.reset();
            });
        });
    });

    describe.only('insert, error case.', function () {
        const data = [
            {id: 1, body: "DATA 1"}
        ];

        let tree;

        beforeEach(function () {
            tree = new SimpleBinaryTree;
        });

        it('trying to insert the same key should get an exeption.', function () {
            // insert.
            assert.strictEqual(tree.insert(data[0]), this._root);

            // insert. should get failed.
            assert.throws(
                () => {
                    tree.insert(data[0]);
                }, /Error: data\.id should be unique. 1/
            );
        });
    });
});

