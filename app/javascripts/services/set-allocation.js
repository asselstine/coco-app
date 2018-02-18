import cocoContract from '../contracts/coco-contract'

export default async function (causeIndex, percentage) {
  let instance = await cocoContract().deployed()
  return instance.setAllocation(causeIndex, percentage, { from: web3.eth.accounts[0] })
}
