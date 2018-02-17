import cocoContract from '../contracts/coco-contract'

export default async function (amount) {
  let instance = await cocoContract().deployed()
  return instance.deposit({ from: web3.eth.accounts[0], value: web3.toWei(amount, 'ether') })
}
