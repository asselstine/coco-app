export default {
  receiveCause: function (index, name) {
    return {
      type: 'RECEIVE_CAUSE',
      index: index,
      name: name
    }
  },

  receiveCauseCount: function (count) {
    return {
      type: 'RECEIVE_CAUSE_COUNT',
      count: count
    }
  }
}
