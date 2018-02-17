import update from 'immutability-helper'

export default function (state, action) {
  if (typeof state === 'undefined') {
    state = {}
  }

  switch (action.type) {
    case 'RECEIVE_BUSINESS_COUNT':
      state = update(state, {
        count: {
          $set: action.count
        }
      })
      break
    case 'RECEIVE_BUSINESS':
      var cmd = {}
      cmd[action.index] = {
        $set: {
          index: action.index,
          name: action.name,
          percentage: action.percentage
        }
      }
      state = update(state, cmd)
      break
  }

  return state
}
