export default {
  receiveAllocationCount: function (count) {
    return {
      type: 'RECEIVE_ALLOCATION_COUNT',
      count: count
    }
  },

  receiveAllocation: function (allocationIndex, causeIndex, percentage) {
    return {
      type: 'RECEIVE_ALLOCATION',
      index: allocationIndex,
      causeIndex: causeIndex,
      percentage: percentage
    }
  }
}
