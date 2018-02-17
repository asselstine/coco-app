import React, {
  Component
} from 'react'
import { Modal } from '../modal'
import buyCoco from '../../services/buy-coco'
import getBalance from '../../services/get-balance'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Ether } from '../ether'
import formatCoco from '../../format-coco'
import listenDeposits from '../../services/listen-deposits'

export const Dashboard = connect(
  (state, ownProps) => {
    return {
      balance: _.get(state, `accounts[${web3.eth.accounts[0]}].balance`) || 0
    }
  }
)(class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showBuyModal: false,
      buyAmount: 0
    }
  }

  componentDidMount () {
    getBalance(web3.eth.accounts[0])
    listenDeposits()
  }

  onBuy () {
    this.setState({
      showBuyModal: true,
      buyAmount: 0
    })
  }

  closeModal () {
    this.setState({
      showBuyModal: false
    })
  }

  buy (e) {
    e.preventDefault()
    buyCoco(this.state.buyAmount)
      .then(() => {
        this.closeModal()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render () {
    return (
      <div>
        <Modal isOpen={this.state.showBuyModal} onClose={this.closeModal.bind(this)}>
          <div className='box'>
            <h1 className='title'>Buy Coco</h1>
            <form onSubmit={this.buy.bind(this)}>
              <div className='field'>
                <label className='label'>Amount</label>
                <div className='control'>
                  <input className='input' type='number' value={this.state.buyAmount} onChange={(e) => this.setState({ buyAmount: e.target.value })}/>
                </div>
              </div>
              <div className='field'>
                <div className='control'>
                  <input type='submit' value='Buy' className='button is-success'/>
                </div>
              </div>
            </form>
          </div>
        </Modal>
        <section className='hero is-bold'>
          <div className="hero-body">
            <div className="container has-text-centered">
              <img src='/images/coco-brand--dark-on-white.png' alt='Coco' />
            </div>
          </div>
        </section>
        <section className='section'>
          <div className='container'>
            <nav className='level'>
              <div className='level-item has-text-centered'>
                <div>
                  <p className='heading'>Your Balance</p>
                  <p className='title'>{formatCoco(this.props.balance)}</p>
                  <br />
                  <button className='button is-primary is-large' onClick={this.onBuy.bind(this)}>Buy</button>
                </div>
              </div>
            </nav>
          </div>
        </section>
      </div>
    )
  }
})
