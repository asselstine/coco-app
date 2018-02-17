export default {
  receiveBalance: function (address, balance) {
    return {
      type: 'RECEIVE_BALANCE',
      balance: balance,
      address: address
    }
  }
}
