pragma solidity ^0.4.17;

contract Coco {
  mapping (address => uint) balances;

  event Deposited(address indexed user, uint amount);

  struct Business {
    string name;
    uint percentage;
  }

  mapping (address => Business) ownersToBusiness;

  function balance(address account) external view returns(uint) {
    return balances[account];
  }

  function deposit() external payable {
    balances[msg.sender] += msg.value * 1000;
    Deposited(msg.sender, msg.value);
  }

  function registerBusiness(string name, uint percentage) external {
    ownersToBusiness[msg.sender] = Business(name, percentage)
  }
}
