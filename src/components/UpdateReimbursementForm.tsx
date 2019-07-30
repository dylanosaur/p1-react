import React from 'react'

export default class UpdateReimbursementForm extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      userid: '',
      status: 'Pending',
    }
  }

  updateInputValue = (event: any) => {
    let newState: any = {}
    newState[event.target.id] = event.target.value;
    this.setState({ ...this.state, ...newState })
  }

  render() {
    return (
      <div id='form-container'>
        <form id='form'>

          <label htmlFor={'userid'}>User ID</label>
          <input type='text' id='userid' value={this.state.userid} onChange={this.updateInputValue} />

          <label htmlFor={'status'}>Status</label>
          <select id='status' name='type' value={this.state.status} onChange={this.updateInputValue} >
            <option value='None'>None</option>
            <option value='Pending'>Pending</option>
            <option value='Approved'>Approved</option>
            <option value='Denied'>Denied</option>
          </select>

        </form>
        <button id='form-button' onClick={() => this.props.filterReimbursements(this.state)}>Filter</button>
      </div>
    )
  }
}