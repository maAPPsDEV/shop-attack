# Solidity Game - Shop Attack

_Inspired by OpenZeppelin's [Ethernaut](https://ethernaut.openzeppelin.com), Shop Level_

⚠️Do not try on mainnet!

## Task

Сan you get the item from the shop for less than the price asked?

_Hint:_

1. `Shop` expects to be used from a `Buyer`
2. Understanding how `gas()` options works

## What will you learn?

1. Interface
2. Gas Adjustment

## What is the most difficult challenge?

### Byzantine hardfork

This level is very similar to that of [Elevator](https://github.com/maAPPsDEV/elevator-attack) where you return different value everytime you call the function. The only problem now is the fact that you are only given 3k gas which is not enough to modify any state variables. Even if you wanted to, you can't because the interface requires a view function. Notice how there is actually a flag on the Shop contract that is being modified if it passes the first check? Yes the `isSold` variable! That is the variable that we will use to return different prices. Make sure you import the `Buyer` interface and `Shop` contract. Note that because of the Byzantine hardfork, this solution will actually fail because the `price()` function requires 3.8k gas but only 3k gas is given.

### Game Fail

The call still fails because `price()` uses more than the allotted 3000 gas. This [challenge was written a couple of years ago](https://github.com/OpenZeppelin/ethernaut/issues/156) and gas prices changed on a per instruction-level since then. This just shows how important it is to not assume anything about gas prices.

## Source Code

⚠️This contract contains a bug or risk. Do not use on mainnet!

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface Buyer {
  function price() external view returns (uint256);
}

contract Shop {
  uint256 public price = 100;
  bool public isSold;

  function buy() public {
    Buyer _buyer = Buyer(msg.sender);

    if (_buyer.price.gas(3000)() >= price && !isSold) {
      isSold = true;
      price = _buyer.price.gas(3000)();
    }
  }
}

```

## Configuration

### Install Truffle cli

_Skip if you have already installed._

```
npm install -g truffle
```

### Install Dependencies

```
yarn install
```

## Test and Attack!💥

### Run Tests

```
truffle develop
test
```

```
truffle(develop)> test
Using network 'develop'.


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



  Contract: Hacker
    1) should get the item from the shop for less than the price asked
    > No events were emitted


  0 passing (2s)
  1 failing

  1) Contract: Hacker
       should get the item from the shop for less than the price asked:
     Error: Returned error: VM Exception while processing transaction: revert
      at Context.<anonymous> (test\hacker.js:15:41)
      at processTicksAndRejections (node:internal/process/task_queues:96:5)

```
