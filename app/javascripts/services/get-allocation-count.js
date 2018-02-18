import allocationActions from '../actions/allocation-actions'
import cocoContract from '../contracts/coco-contract'
import { store } from '../store'

export default async function () {
  let instance = await cocoContract().deployed()
  instance.getAllocationCount({ from: web3.eth.accounts[0] }).then((result) => {
    store.dispatch(allocationActions.receiveAllocationCount(result))
  })
}
