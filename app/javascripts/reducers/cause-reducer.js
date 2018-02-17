import update from 'immutability-helper'

export default function (state, action) {
  if (typeof state === 'undefined') {
    state = {}
  }

  switch (action.type) {
    case 'RECEIVE_CAUSE_COUNT':
      state = update(state, {
        count: {
          $set: action.count
        }
      })
      break
    case 'RECEIVE_CAUSE':
      var cmd = {}
      cmd[action.index] = {
        $set: {
          index: action.index,
          name: action.name
        }
      }
      state = update(state, cmd)
      break
  }

  return state
}
