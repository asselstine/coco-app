import cocoContract from '../contracts/coco-contract'

export default async function (name, percentage) {
  let instance = await cocoContract().deployed()
  return instance.newCause(name, { from: web3.eth.accounts[0] })
}
