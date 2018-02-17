import businessActions from '../actions/business-actions'
import cocoContract from '../contracts/coco-contract'
import { store } from '../store'

export default async function (index) {
  let instance = await cocoContract().deployed()
  instance.getBusiness(index, { from: web3.eth.accounts[0] }).then((result) => {
    store.dispatch(businessActions.receiveBusiness(index, result[0], result[1]))
  })
}
