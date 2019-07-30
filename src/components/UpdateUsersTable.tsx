import React from 'react'

export default class UpdateUsersTable extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {}
  }
  updateInputValue = (event: any) => {
    console.log(event)
    let newState: any = {}
    newState[event.target.id] = event.target.value;
    this.setState({ ...this.state, ...newState })
  }

  render() {
    //let role:any = {1: 'Admin', 2: 'Finance Manager', 3: 'User'}
    return (
      <div id='users-table'>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">user ID</th>
              <th scope="col">username</th>
              <th scope="col">E-mail</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">New Password</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map((x: any) =>
              <tr key={'u' + x.userId}>
                <td>{x.userId}</td>
                <td><input type='text' id={'u' + x.userId + 'username'} value={this.state['u' + x.userId + 'username'] || x.username}
                  onChange={this.updateInputValue} /></td>
                <td><input type='text' id={'u' + x.userId + 'email'} value={this.state['u' + x.userId + 'email'] || x.email}
                  onChange={this.updateInputValue} /></td>
                <td><input type='text' id={'u' + x.userId + 'firstname'} value={this.state['u' + x.userId + 'firstname'] || x.firstName}
                  onChange={this.updateInputValue} /></td>
                <td><input type='text' id={'u' + x.userId + 'lastname'} value={this.state['u' + x.userId + 'lastname'] || x.lastName}
                  onChange={this.updateInputValue} /></td>
                <td><input type='text' id={'u' + x.userId + 'password'} value={this.state['u' + x.userId + 'password'] || x.password}
                  onChange={this.updateInputValue} /></td>
                <td>
                  <select id={'u' + x.userId + 'roleid'} name='type' value={this.state['u' + x.userId + 'roleid'] || x.roleId} onChange={this.updateInputValue} >
                    <option value={1}>Admin</option>
                    <option value={2}>Finance Manager</option>
                    <option value={3}>User</option>
                  </select>
                </td>
                <td>
                  <button id={'update' + x.userid} onClick={() => this.props.updateUser({
                    userId: x.userId,
                    username: this.state['u' + x.userId + 'username'] || x.username,
                    firstName: this.state['u' + x.userId + 'firstname'] || x.firstName,
                    lastName: this.state['u' + x.userId + 'lastname'] || x.lastName,
                    email: this.state['u' + x.userId + 'email'] || x.email,
                    password: this.state['u' + x.userId + 'password'] || x.password,
                    roleId: this.state['u' + x.userId + 'roleid'] || x.roleId,
                  }
                  )}>Update</button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}