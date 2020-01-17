'use strict'

const mocks = require('node-mocks-http');
const {expect} = require('chai');

const {authentication} = require('../index');
const {authorization} = require('../index');
const Role = require('../src/_helper/role');

describe("FTAuth", function() {
    it('should generate token', () => {
        const token = authentication.generateToken(1, Role.User,"supersecretkey", '1h', '24h');
        expect(token).to.not.equal(undefined);
    })
    it("should set the current user's role", () => {
        expect(authorization.setCurrentRole('Admin')).to.equal('Admin');
    });
    it("should check if user is authorized", () => {
        authorization.setCurrentRole('User')
        const req = mocks.createRequest();
        const res = mocks.createResponse();

        const result = authorization.checkUser(Role.Admin); 

        result(req, res);

        var data = res._getJSONData();

        expect(data.status).to.equal('401');
        
    });
    
});