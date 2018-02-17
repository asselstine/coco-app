pragma solidity ^0.4.17;

contract Coco {
  mapping (address => uint) balances;

  event Deposited(address indexed user, uint amount);
  event BusinessRegistered(address indexed owner, uint index, string name, uint percentage);

  struct Business {
    string name;
    uint percentage;
  }

  mapping (address => uint) ownersToBusinessIndex;
  Business[] businesses;

  function balance(address account) external view returns(uint) {
    return balances[account];
  }

  function deposit() external payable {
    balances[msg.sender] += msg.value * 1000;
    Deposited(msg.sender, msg.value);
  }

  function registerBusiness(string name, uint percentage) external {
     uint index = businesses.push(Business(name, percentage));
     ownersToBusinessIndex[msg.sender] = index;
     BusinessRegistered(msg.sender, index, name, percentage);
  }

  function getBusinessesCount() external view returns (uint) {
    return businesses.length;
  }

  function getBusiness(uint index) external view returns (string, uint) {
    Business storage business = businesses[index];
    return (
      business.name,
      business.percentage
    );
  }
}
