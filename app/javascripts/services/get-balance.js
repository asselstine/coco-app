import accountActions from '../actions/account-actions'
import cocoContract from '../contracts/coco-contract'
import { store } from '../store'

export default async function (address) {
  let instance = await cocoContract().deployed()
  instance.balance(address, { from: web3.eth.accounts[0] }).then((result) => {
    store.dispatch(accountActions.receiveBalance(address, result))
  })
}
