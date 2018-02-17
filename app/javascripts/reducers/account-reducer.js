import update from 'immutability-helper'

function initAccount(state, address) {
  if (!state[address]) {
    var cmd = {}
    cmd[address] = { $set: { balance: 0 } }
    state = update(state, cmd)
  }
  return state
}

export default function (state, action) {
  if (typeof state === 'undefined') {
    state = {}
  }

  switch (action.type) {
    case 'RECEIVE_BALANCE':
      state = initAccount(state, action.address)
      var cmd = {}
      cmd[action.address] = {
        balance: {
          $set: action.balance
        }
      }
      state = update(state, cmd)
      break
  }

  return state
}
