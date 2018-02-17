import businessActions from '../actions/business-actions'
import cocoContract from '../contracts/coco-contract'
import { store } from '../store'

export default async function () {
  let instance = await cocoContract().deployed()
  instance.getBusinessesCount({ from: web3.eth.accounts[0] }).then((result) => {
    store.dispatch(businessActions.receiveBusinessCount(result))
  })
}
