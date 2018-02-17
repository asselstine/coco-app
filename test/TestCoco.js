import assertRevert from 'zeppelin-solidity/test/helpers/assertRevert'
import BigNumber from 'bignumber.js'
const Coco = artifacts.require('Coco')

contract('Coco', function (accounts) {
  let coco;

  let memberAddress = accounts[0]
  let businessAddress = accounts[1]
  let causeAddress = accounts[2]

  beforeEach(async function () {
    await Coco.new().then(function (instance) {
      coco = instance
    })
  })

  describe('deposit()', function () {
    it('allows a user to purchase tokens', async function () {
      await coco.deposit({ from: memberAddress, value: 1 })
      assert.equal(await coco.balance(memberAddress, { from: memberAddress }), 1000)
    })
  })
})
