import causeActions from '../actions/cause-actions'
import cocoContract from '../contracts/coco-contract'
import { store } from '../store'

export default async function () {
  let instance = await cocoContract().deployed()
  instance.getCausesCount({ from: web3.eth.accounts[0] }).then((result) => {
    store.dispatch(causeActions.receiveCauseCount(result))
  })
}
