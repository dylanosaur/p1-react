import React from 'react';
export default class LoginForm extends React.Component<any, any> {

    constructor(props:any){
      super(props);
      this.state = {
        username: 'DKoenig',
        password: 'moneymoney'
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
            <label htmlFor={'username'}>Username</label>
            <input type='text' id='username'
              value={this.state.username} onChange={this.updateInputValue} />
            <label htmlFor={'password'}>Password</label>
            <input type='password' id='password'
              value={this.state.password} onChange={this.updateInputValue} />
          </form>
          <button id='form-button' onClick={() => this.props.submitCredentials(this.state.username, this.state.password)}>Submit</button>
        </div>
      )
    }
}