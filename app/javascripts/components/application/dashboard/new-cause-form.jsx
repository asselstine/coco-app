import React, {
  Component
} from 'react'

export class NewCauseForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  onSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.state.name)
  }

  render () {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className='field'>
          <label className='label'>Name</label>
          <div className='control'>
            <input className='input' type='text' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}/>
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
