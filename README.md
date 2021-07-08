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

## Source Code

⚠️This contract contains a bug or risk. Do not use on mainnet!

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Token {
  mapping(address => uint256) balances;
  uint256 public totalSupply;

  constructor(uint256 _initialSupply) public {
    balances[msg.sender] = totalSupply = _initialSupply;
  }

  function transfer(address _to, uint256 _value) public returns (bool) {
    require(balances[msg.sender] - _value >= 0);
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    return true;
  }

  function balanceOf(address _owner) public view returns (uint256 balance) {
    return balances[_owner];
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
    √ should steal countless of tokens (377ms)


  1 passing (440ms)

```
