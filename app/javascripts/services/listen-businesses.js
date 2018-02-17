import { store } from '../store'
import cocoContract from '../contracts/coco-contract'
import getBusinessCount from './get-business-count'

var registerBusinessEvents;

export default function listenToBusinesses() {
  if (registerBusinessEvents) {
    return false
  } else {
    cocoContract().deployed().then(instance => {
      registerBusinessEvents = instance.BusinessRegistered()
      registerBusinessEvents.watch((error, result) => {
        if (error) {
          console.error(error)
        } else {
          getBusinessCount()
          console.log(result)
        }
      })
    })
    return true
  }
}
