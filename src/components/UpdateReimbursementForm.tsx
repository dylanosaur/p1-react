import React from 'react'

export default class UpdateReimbursementForm extends React.Component<any, any> {

    constructor(props:any){
      super(props);
      this.state = {
        userid: '',
        author: '',
        resolver: '',
        firstname: '',
        lastname: '',
        status: 'Pending',
        type: 'None',
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

            <label htmlFor={'userid'}>User ID</label>
            <input type='text' id='userid' value={this.state.userid} onChange={this.updateInputValue} />
            
            <label htmlFor={'firstname'}>First Name</label>
            <input type='text' id='firstname' value={this.state.firstname} onChange={this.updateInputValue} />
            
            <label htmlFor={'lastname'}>Last Name</label>
            <input type='text' id='lastname' value={this.state.lastname} onChange={this.updateInputValue} />
            
            <label htmlFor={'type'}>Type</label>
            <select id='type' name='type' value={this.state.type} onChange={this.updateInputValue} >
              <option value='None'>None</option>
              <option value='Lodging'>Lodging</option>
              <option value='Travel'>Travel</option>
              <option value='Food'>Food</option>
              <option value='Other'>Other</option>
            </select>
  
            <label htmlFor={'resolver'}>Resolver</label>
            <input type='text' id='resolver' value={this.state.resolver} onChange={this.updateInputValue} />

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