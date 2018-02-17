export default {
  receiveBusiness: function (index, name, percentage) {
    return {
      type: 'RECEIVE_BUSINESS',
      index: index,
      name: name,
      percentage: percentage
    }
  },

  receiveBusinessCount: function (count) {
    return {
      type: 'RECEIVE_BUSINESS_COUNT',
      count: count
    }
  }
}
