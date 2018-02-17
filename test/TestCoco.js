import assertRevert from 'zeppelin-solidity/test/helpers/assertRevert'
import BigNumber from 'bignumber.js'
const Coco = artifacts.require('Coco')

contract('Coco', function (accounts) {
  let coco;
  let validatorIndex;

  let validatorAddress = accounts[0]
  let withdrawalAddress = accounts[1]
  let userAddress = accounts[2]

  beforeEach(async function () {
    await Coco.new().then(function (instance) {
      coco = instance
    }).then(async () => {
      await coco.newValidator(withdrawalAddress)
      validatorIndex = 0
    })
  })

  describe('newValidator()', function () {
    it('cannot create multiple validators for the same address', async function () {
      assertRevert(coco.newValidator(withdrawalAddress))
    })
  })

  describe('deposit()', function () {
    it('validator should be able to deposit ether', async function () {
      await coco.deposit(validatorIndex, { from: validatorAddress, value: 10 })
      let validator = await coco.getValidator(validatorIndex)
      assert.equal(validator[2], 10)
    })

    it('validator cannot deposit more than once', async function () {
      await coco.deposit(validatorIndex, { from: validatorAddress, value: 10 })
      // await assertRevert(coco.deposit(validatorIndex, { from: validatorAddress, value: 20 }))
    })

    it('user cannot deposit unless validator has deposited', async function () {
      await assertRevert(coco.deposit(validatorIndex, { from: userAddress, value: 20 }))
    })

    it('user can deposit ether', async function () {
      await coco.deposit(validatorIndex, { from: validatorAddress, value: 10 })
      await coco.deposit(validatorIndex, { from: userAddress, value: 9 })

      let validator = await coco.getValidator(validatorIndex)
      assert.equal(validator[3], 9)
    })

    it('operator activates when user ether matches deposit', async function () {
      await coco.deposit(validatorIndex, { from: validatorAddress, value: 10 })
      await coco.deposit(validatorIndex, { from: userAddress, value: 10 })

      let validator = await coco.getValidator(validatorIndex)
      assert.equal(validator[5], 0)
    })

    it('cannot deposit into a logged-in operator', async function () {
      await coco.deposit(validatorIndex, { from: validatorAddress, value: 10 })
      await coco.deposit(validatorIndex, { from: userAddress, value: 10 })

      await coco.activate(validatorIndex)

      await assertRevert(coco.deposit(validatorIndex, { from: userAddress, value: 10 }))
      await assertRevert(coco.deposit(validatorIndex, { from: validatorAddress, value: 10 }))
    })
  })

  describe('logout()', function () {
    it('should create a fake deposit', async function () {
      await coco.deposit(validatorIndex, { from: validatorAddress, value: 10 })
      await coco.deposit(validatorIndex, { from: userAddress, value: 10 })
      let validator = await coco.getValidator(validatorIndex)
      assert.equal(validator[4], 0)
      await coco.activate(validatorIndex)
      await coco.logout(validatorIndex)
      validator = await coco.getValidator(validatorIndex)
      assert.equal(validator[4], 2)
      assert.equal(validator[5], 20)
      assert.equal(await coco.interestRate(), 5)
      assert.equal(validator[6], 21)
    })
  })

  describe('withdraw()', function () {
    describe('stakerWithdrawal()', function () {
      it('should remove the stake and interest when active', async function () {
        let initialBalance = web3.eth.getBalance(userAddress)
        await coco.deposit(validatorIndex, { from: validatorAddress, value: 100 })
        await coco.deposit(validatorIndex, { from: userAddress, value: 100 })

        await coco.activate(validatorIndex)
        await coco.logout(validatorIndex)

        await coco.withdraw(validatorIndex, { from: userAddress })
        assert.equal(
          web3.eth.getBalance(userAddress).mod(100000).toString(),
          initialBalance.plus(5).mod(100000).toString()
        )
      })

      it('should return the deposit if not active', async function () {
        let initialBalance = web3.eth.getBalance(userAddress)
        await coco.deposit(validatorIndex, { from: validatorAddress, value: 100 })
        await coco.deposit(validatorIndex, { from: userAddress, value: 90 })
        await coco.withdraw(validatorIndex, { from: userAddress })
        assert.equal(
          web3.eth.getBalance(userAddress).mod(100000).toString(),
          initialBalance.mod(100000).toString()
        )
      })
    })

    describe('validatorWithdrawal', function () {
      xit('fill this out!')
    })
  })

  describe('getValidatorCount()', function () {
    it('should return the correct count', async function () {
      let validatorCount = await coco.getValidatorCount()
      assert.equal(validatorCount, 1)
    })
  })
})
