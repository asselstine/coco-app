import allocationActions from '../actions/allocation-actions'
import cocoContract from '../contracts/coco-contract'
import { store } from '../store'

export default async function (index) {
  let instance = await cocoContract().deployed()
  instance.getAllocation(index, { from: web3.eth.accounts[0] }).then((result) => {
    store.dispatch(allocationActions.receiveAllocation(index, result[0], result[1]))
  })
}
