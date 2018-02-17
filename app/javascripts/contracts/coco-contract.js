import { default as contract } from 'truffle-contract'
import cocoArtifacts from '../../../build/contracts/Coco.json'

const Coco = contract(cocoArtifacts)

export default function () {
  Coco.setProvider(web3.currentProvider);
  return Coco
}
