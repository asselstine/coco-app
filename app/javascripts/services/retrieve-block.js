import { store } from '../store'
import blockActions from '../actions/block-actions'
import cocoContract from '../contracts/coco-contract'

export default function (hash) {
  web3.eth.getBlock(hash, false, (error, result) => {
    if (error) {
      console.error(error)
    } else {
      store.dispatch(blockActions.receiveBlock(result))
    }
  })
}
