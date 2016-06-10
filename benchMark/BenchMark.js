'use strict';
/*eslint-disable no-console*/

const _ = require('lodash');
const assert = require('assert');
const LLRBTree = require('./../lib/LLRBTree');
const SimpleBinaryTree = require('./../lib/SimpleBinaryTree');

// nanosec profiler.
class NanoTimer {
    constructor() {
        this._period = process.hrtime();
    }

    stop() {
        const elapsed = process.hrtime(this._period);
        return elapsed[0] * 1e9 + elapsed[1];   // nano sec.
    }
}

function _lenearSeach(data, target) {
    for (let i = 0; i < data.length; ++i) {
        if (data[i].id === target) {
            return data[i];
        }
    }
    return null;
}

function _benchMark(data) {
    const treeSimple = new SimpleBinaryTree.Tree;
    const treeLLRB = new LLRBTree.Tree;

    const buff = _.shuffle(data);
    buff.forEach(function (item) {
        treeSimple.insert(item.id, item);
        treeLLRB.insert(item.id, item);
    });

    function _test(_func) {
        const timer = new NanoTimer;
        _func();
        return timer.stop();
    }

    const target = _.shuffle(buff)[0].id;

    return {
        linear: _test(() => {
            assert.strictEqual(_lenearSeach(buff, target).id, target);
        }),
        simpleTree: _test(() => {
            assert.strictEqual(treeSimple.lookup(target).id, target);
        }),
        llrbTree: _test(() => {
            assert.strictEqual(treeLLRB.lookup(target).id, target);
        })
    }
}

const RECORD_SIZE = 10000;
const ITERATE_COUNT = 500;

function benchMark() {
    const data = _.range(1, RECORD_SIZE).map((key) => {
        return {
            id: key,
            data: "DATA " + key
        }
    });

    let totalLinear = 0;
    let totalSimple = 0;
    let totalLLRB = 0;

    for (let i = 0; i < ITERATE_COUNT; ++i) {
        const result = _benchMark(data);
        console.log(i, (result));

        totalLinear += result.linear;
        totalSimple += result.simpleTree;
        totalLLRB += result.llrbTree;
    }

    const averageLinear = (totalLinear / ITERATE_COUNT) | 0;
    const averageSimple = (totalSimple / ITERATE_COUNT) | 0;
    const averageLLRB = (totalLLRB / ITERATE_COUNT) | 0;

    console.log("average");
    console.log("Linear search", averageLinear);
    console.log("SimpleTree search", averageSimple, ((averageSimple / averageLinear * 100) | 0) + "%");
    console.log("LLRBTree search", averageLLRB, ((averageLLRB / averageLinear * 100) | 0) + "%");
}

benchMark();

/*eslint-enable no-console*/
