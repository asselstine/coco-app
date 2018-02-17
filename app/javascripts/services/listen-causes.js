import { store } from '../store'
import cocoContract from '../contracts/coco-contract'
import getCausesCount from './get-causes-count'

var newCauseEvents;

export default function listenCauses() {
  if (newCauseEvents) {
    return false
  } else {
    cocoContract().deployed().then(instance => {
      newCauseEvents = instance.NewCause()
      newCauseEvents.watch((error, result) => {
        if (error) {
          console.error(error)
        } else {
          getCausesCount()
          console.log(result)
        }
      })
    })
    return true
  }
}
