import { store } from '../store'
import cocoContract from '../contracts/coco-contract'
import getBalance from './get-balance'

var depositedEvents;

export default function listenToDeposits() {
  if (depositedEvents) {
    return false
  } else {
    cocoContract().deployed().then(instance => {
      depositedEvents = instance.Deposited()
      depositedEvents.watch((error, result) => {
        if (error) {
          console.error(error)
        } else {
          var address = result.args.user
          if (store.getState().accounts[address]) {
            getBalance(address)
          }
          console.log(result)
        }
      })
    })
    return true
  }
}
