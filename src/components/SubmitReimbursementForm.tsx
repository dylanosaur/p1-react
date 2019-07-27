import React from 'react'

export default class SubmitReimbursementForm extends React.Component<any, any> {

    constructor(props:any){
      super(props);
      this.state = {
        amount: '5000000',
        type: 'Lodging',
        description: 'brief description here'
      }
    }
  
    updateInputValue = (event: any) => {
      let newState: any = {}
      newState[event.target.id] = event.target.value;
      this.setState({ ...this.state, ...newState})
    }
  
    render() { 
      return(
        <div id='form-container'>
          <form id='form'>
          <label htmlFor={'amount'}>Amount (USD)</label>
          <input type='text' id='amount'
            value={this.state.amount} onChange={this.updateInputValue} />
          <label htmlFor={'type'}>Type</label>
          <select id='type' name='type' onChange={this.updateInputValue} >
            <option value='Lodging' >Lodging</option>
            <option value='Travel' >Travel</option>
            <option value='Food' >Food</option>
            <option value='Other' >Other</option>
          </select>
          <label htmlFor={'description'}>Description</label>
          <input type='text' id='description'
            value={this.state.description} onChange={this.updateInputValue} />
          </form>
          <button id='form-button' onClick={() => this.props.submitReimbursement(this.state.amount, this.state.type, this.state.description)}>Submit</button>
        </div>
      )
    }
  }