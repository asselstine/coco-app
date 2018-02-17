import React, {
  Component
} from 'react'

export class RegisterBusinessForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      percentage: 1
    }
  }

  onSubmit (e) {
    e.preventDefault()
  }

  render () {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className='field'>
          <label className='label'>Name</label>
          <div className='control'>
            <input className='input' type='number' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}/>
          </div>
        </div>
        <div className='field'>
          <label className='label'>Percentage</label>
          <div className='control'>
            <input className='input' type='number' value={this.state.percentage} onChange={(e) => this.setState({ percentage: e.target.value })}/>
          </div>
        </div>
        <div className='field'>
          <div className='control'>
            <input type='submit' value='Register' className='button is-success'/>
          </div>
        </div>
      </form>
    )
  }
}
