import causeActions from '../actions/cause-actions'
import cocoContract from '../contracts/coco-contract'
import { store } from '../store'

export default async function (index) {
  let instance = await cocoContract().deployed()
  instance.getCause(index, { from: web3.eth.accounts[0] }).then((result) => {
    store.dispatch(causeActions.receiveCause(result[0], result[1]))
  })
}
