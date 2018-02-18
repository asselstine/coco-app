import { store } from '../store'
import cocoContract from '../contracts/coco-contract'
import getAllocationCount from './get-allocation-count'

var allocationEvents;

export default function listenToAllocations() {
  if (allocationEvents) {
    return false
  } else {
    cocoContract().deployed().then(instance => {
      allocationEvents = instance.AllocationUpdated()
      allocationEvents.watch((error, result) => {
        if (error) {
          console.error(error)
        } else {
          getAllocationCount()
          console.log(result)
        }
      })
    })
    return true
  }
}
