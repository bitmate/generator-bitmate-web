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

test('Call this.serverPrompts', () => {
    context.serverPrompts = () => {};
    const server = chai.spy.on(context, 'serverPrompts');
    TestUtils.call(context, 'prompting.server');
    expect(server).to.have.been.called.once();
});

test('Call this.clientPrompts', () => {
    context.clientPrompts = () => {};
    const client = chai.spy.on(context, 'clientPrompts');
    TestUtils.call(context, 'prompting.client');
    expect(client).to.have.been.called.once();
});

test('composing(): Call this.composeWith, should generate server and client', () => {
    context.composeWith = () => {};
    const spy = chai.spy.on(context, 'composeWith');
    TestUtils.call(context, 'composing', {
        client: 'angular1',
        server: 'express'
    });
    expect(spy).to.have.been.called.twice;
});

test('composing(): should only generate server if no client framework', () => {
    context.composeWith = () => {};
    const spy = chai.spy.on(context, 'composeWith');
    TestUtils.call(context, 'composing', {
        client: 'none',
        server: 'express'
    });
    expect(spy).to.have.been.called.once;
    expect(spy).to.have.been.called.with('bitmate-express');
});