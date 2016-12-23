const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;
const should = chai.should(); // eslint-disable-line no-unused-vars
chai.use(spies);
const test = require('ava');
const TestUtils = require('bitmate-generator').TestUtils;

let context;

test.before(() => {
    context = TestUtils.mock('app');
    require('../../generators/app/index');
    process.chdir('../../');
});

test('Call this.bitmatePrompts', () => {
    context.bitmatePrompts = () => {};
    const prompts = chai.spy.on(context, 'bitmatePrompts');
    TestUtils.call(context, 'prompting');
    expect(prompts).to.have.been.called.once();
});

test('composing(): Call this.composeWith, should generate server, client and runner', () => {
    context.composeWith = () => {};
    const spy = chai.spy.on(context, 'composeWith');
    TestUtils.call(context, 'composing', {
        client: 'angular1',
        server: 'express',
        runner: 'grunt'
    });
    expect(spy).to.have.been.called.exactly(3);
});

test('composing(): should only generate server if no client framework', () => {
    context.composeWith = () => {};
    const spy = chai.spy.on(context, 'composeWith');
    TestUtils.call(context, 'composing', {
        client: 'none',
        server: 'express',
        runner: 'grunt'
    });
    expect(spy).to.have.been.called.twice;
});