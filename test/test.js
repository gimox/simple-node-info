const chai = require('chai');
const info = require('../lib/main');
const expect = chai.expect;


describe("Test simple node", () => {
    before(() => {
        const result = info.getStat();
    });

    it('test startTime'), (done) => {
        expect(result).to.have.property('startTime');
        done();
    };

    it('get nodeVersion'), (done) => {
        const result = info.getStat();
        expect(result).to.have.property('nodeVersion');
        done();
    };

    it('get pid'), (done) => {
        const result = info.getStat();
        expect(result).to.have.property('pid');
        done();
    };

    it('get loadAvg'), (done) => {
        const result = info.getStat();
        expect(result).to.have.property('loadAvg');
        done();
    };

    it('get memoryUsage'), (done) => {
        const result = info.getStat();
        expect(result).to.have.property('memoryUsage');
        done();
    };

    it('get freeMemory'), (done) => {
        const result = info.getStat();
        expect(result).to.have.property('freeMemory');
        done();
    };

    it('get upTime'), (done) => {
        const result = info.getStat();
        expect(result).to.have.property('upTime');
        done();
    };

    it('get env'), (done) => {
        const result = info.getStat();
        expect(result).to.have.property('env');
        done();
    };

    it('get hostname'), (done) => {
        const result = info.getStat();
        expect(result).to.have.property('hostname');
        done();
    };

    it('get serverIp'), (done) => {

        expect(result).to.have.property('serverIp');
        done();
    };


});
