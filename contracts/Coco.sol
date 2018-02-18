pragma solidity ^0.4.17;

contract Coco {
  mapping (address => uint) balances;

  event Deposited(address indexed user, uint amount);
  event BusinessRegistered(address indexed owner, uint index, string name, uint percentage);
  event NewCause(uint index, string name);
  event AllocationUpdated(uint index, uint causeIndex, uint percentage);

  struct Business {
    string name;
    uint percentage;
  }

  mapping (address => uint) ownersToBusinessIndex;
  Business[] businesses;

  struct Allocation {
    uint causeIndex;
    uint percentage;
  }

  mapping(address => Allocation[]) userToAllocations;

  struct Cause {
    string name;
  }

  Cause[] causes;

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

  function newCause(string name) external {
    uint index = causes.push(Cause(name));
    NewCause(index, name);
  }

  function getCausesCount() external view returns (uint) {
    return causes.length;
  }

  function getCause(uint index) external view returns (uint, string) {
    Cause storage cause = causes[index];
    return (
      index,
      cause.name
    );
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

  function setAllocation(uint causeIndex, uint percentage) external {
    Allocation[] storage allocations = userToAllocations[msg.sender];
    uint foundIndex = uint(-1);
    for (uint index = 0; index < allocations.length; index++) {
      Allocation storage allocation = allocations[index];
      if (allocation.causeIndex == causeIndex) {
        foundIndex = index;
        allocation.percentage = percentage;
      }
    }
    if (foundIndex == uint(-1)) {
      foundIndex = userToAllocations[msg.sender].push(Allocation(causeIndex, percentage));
    }
    AllocationUpdated(foundIndex, causeIndex, percentage);
  }

  function getAllocation(uint allocationIndex) external view returns (uint, uint) {
    Allocation storage allocation = userToAllocations[msg.sender][allocationIndex];
    return (
      allocation.causeIndex,
      allocation.percentage
    );
  }

  function getAllocationCount() external view returns (uint) {
    return userToAllocations[msg.sender].length;
  }
}
