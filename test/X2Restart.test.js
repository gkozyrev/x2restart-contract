const { expect } = require("chai");
const { BigNumber, utils } = require("ethers");
const { ethers } = require("hardhat");

function ether(eth) {
    let weiAmount = ethers.utils.parseEther(eth)
    return weiAmount;
}

describe("X2Restart", async () => {
    beforeEach(async () => {
        [this.owner, this.addr1, this.addr2, ...this.addrs] = await ethers.getSigners();
        const X2Restart = await ethers.getContractFactory("X2Restart");
        this.x2Restart = await X2Restart.deploy();
        this.provider = ethers.provider;

        this.x2Restart.deployed();
    })

    describe('Test buy tokens', async () => {
        it("Ok: buying tokens", async () => {
            // now buying 
            expect(await this.addr1.sendTransaction({
                to: this.x2Restart.address,
                value: utils.hexlify(ether("1"))
            })).to.ok;
        });
    });

    describe('Test buy and withdraw tokens', async () => {
        it("Ok: buying tokens", async () => {
            // now buying 
            expect(await this.addr2.sendTransaction({
                to: this.x2Restart.address,
                value: utils.hexlify(ether("100"))
            })).to.ok;
            // expect(await this.addr1.sendTransaction({
            //     to: this.x2Restart.address,
            //     value: utils.hexlify(ether("0.012"))
            // })).to.ok;

            let addr1Balance = await this.provider.getBalance(this.x2Restart.address)
            console.log("contract balance (in Wei): ", addr1Balance.toString());
            console.log("sending 0.00000112...");
            expect(await this.addr2.sendTransaction({
                to: this.x2Restart.address,
                value: utils.hexlify(ether("0.00000112"))
            })).to.ok;
            addr1Balance = await this.provider.getBalance(this.x2Restart.address)
            console.log("contract balance", addr1Balance.toString());
        });
    });
});