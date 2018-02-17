export default function (amount) {
  return `${web3.fromWei(amount, 'ether').toString()} Coco`
}
