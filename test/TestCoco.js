import assertRevert from 'zeppelin-solidity/test/helpers/assertRevert'
import BigNumber from 'bignumber.js'
const Coco = artifacts.require('Coco')

contract('Coco', function (accounts) {
  let coco;

  let memberAddress = accounts[7]
  let businessAddress = accounts[8]
  let causeAddress = accounts[9]

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

  describe('registerBusiness()', function () {
    it('allows a user to register a business', async function () {
      await coco.registerBusiness('Bizzy', 1, { from: businessAddress })
      assert.equal(await coco.getBusinessesCount(), 1)
      var biz = await coco.getBusiness(0)
      assert.equal(biz[0], 'Bizzy')
      assert.equal(biz[1], 1)
    })
  })
})
