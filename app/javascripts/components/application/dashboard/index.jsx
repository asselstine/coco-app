require('./dashboard.css')

import React, {
  Component
} from 'react'
import { Modal } from '../../modal'
import buyCoco from '../../../services/buy-coco'
import getBalance from '../../../services/get-balance'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Ether } from '../../ether'
import formatCoco from '../../../format-coco'
import listenDeposits from '../../../services/listen-deposits'
import registerBusiness from '../../../services/register-business'
import getBusinessCount from '../../../services/get-business-count'
import listenBusinesses from '../../../services/listen-businesses'
import { RegisterBusinessForm } from './register-business-form'
import { BusinessRow } from './business-row'

export const Dashboard = connect(
  (state, ownProps) => {
    return {
      balance: _.get(state, `accounts[${web3.eth.accounts[0]}].balance`) || 0,
      businessCount: _.get(state, `businesses.count`) || 0
    }
  }
)(class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showBuyModal: false,
      showRegisterBusinessModal: false,
      buyAmount: 0
    }
  }

  componentDidMount () {
    getBalance(web3.eth.accounts[0])
    getBusinessCount()
    listenDeposits()
    listenBusinesses()
  }

  onBuy () {
    this.setState({
      showBuyModal: true,
      buyAmount: 0
    })
  }

  closeModal () {
    this.setState({
      showBuyModal: false,
      showRegisterBusinessModal: false
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

  onRegisterBusiness () {
    this.setState({
      showRegisterBusinessModal: true
    })
  }

  registerBusiness (name, percentage) {
    registerBusiness(name, percentage)
    this.closeModal()
  }

  render () {
    return (
      <div>
        <nav className='background-brand navbar' role='navigation' aria-label='main navigation'>
          <div className='container'>
            <div className='navbar-start'>
              <div className='navbar-brand'>
                <a className="navbar-item" href="/">
                  <img src='/images/coco-brand--full-white.png' alt='Coco' />
                </a>
              </div>
            </div>
            <div className='navbar-end'>
              <div className='navbar-item'>
                <div className="field is-grouped">
                  <p className="control">
                    <a className='button is-danger is-outlined is-inverted' href='javascript:;' onClick={this.onRegisterBusiness.bind(this)}>
                      Register Business
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>

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
                  <input type='submit' value='Buy' className='button is-success' />
                </div>
              </div>
            </form>
          </div>
        </Modal>

        <Modal isOpen={this.state.showRegisterBusinessModal} onClose={this.closeModal.bind(this)}>
          <div className='box'>
            <h1 className='title'>Register Business</h1>
            <RegisterBusinessForm onSubmit={this.registerBusiness.bind(this)}/>
          </div>
        </Modal>

        <section className='section'>
          <div className='container'>
            <nav className='level'>
              <div className='level-item has-text-centered'>
                <div>
                  <p className='heading'>Your Balance</p>
                  <p className='title'>{formatCoco(this.props.balance)}</p>
                  <br />
                  <button className='button is-primary' onClick={this.onBuy.bind(this)}>Buy More</button>
                </div>
              </div>
            </nav>
          </div>
        </section>

        <section className='section'>
          <div className='container has-text-centered'>
            <p className='title'>Participating Businesses</p>
            {_.range(this.props.businessCount.toString()).map((index) => {
              return <BusinessRow index={index} key={index} />
            })}
          </div>
        </section>
      </div>
    )
  }
})
