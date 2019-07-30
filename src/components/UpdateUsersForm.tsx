import React from 'react'

export default class UpdateUsersForm extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      userid: '',
      email: '',
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

          <label htmlFor={'email'}>E-mail</label>
          <input type='text' id='email' value={this.state.email} onChange={this.updateInputValue} />

        </form>
        <button id='form-button' onClick={() => this.props.filterUsers(this.state)}>Get Users</button>
      </div>
    )
  }
}