const Hacker = artifacts.require("Hacker");
const Shop = artifacts.require("Shop");
const { expect } = require("chai");
const { BN, expectRevert } = require("@openzeppelin/test-helpers");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Hacker", function ([_owner, _hacker]) {
  it("should get the item from the shop for less than the price asked", async function () {
    const hackerContract = await Hacker.deployed();
    const targetContract = await Shop.deployed();
    const result = await hackerContract.attack(targetContract.address, { from: _hacker });
    console.log("result", result);
    expect(result.receipt.status).to.be.equal(true);
    expect(await targetContract.isSold()).to.be.equal(true);
    expect(await targetContract.price().lt(new BN(100))).to.be.equal(true);
  });

  /**
   * 3000 gas is not enough to read external contract's state variale, since byzantium hard fork
   */
  // it("should revert after byzantium hard fork", async function () {
  //   const hackerContract = await Hacker.deployed();
  //   const targetContract = await Shop.deployed();
  //   expectRevert.outOfGas(hackerContract.attack(targetContract.address, {from: _hacker}))
  // });
});
