pragma solidity ^0.4.17;

contract Coco {
  mapping (address => uint) balances;

  event Deposited(address indexed user, uint amount);

  function balance(address account) external view returns(uint) {
    return balances[account];
  }

  function deposit() external payable {
    balances[msg.sender] += msg.value * 1000;
    Deposited(msg.sender, msg.value);
  }
}
