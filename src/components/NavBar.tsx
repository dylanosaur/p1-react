import React from 'react'
import NavItem from './NavItem';

export default class NavBar extends React.Component<any, any> {
  render() {
    const Login = <NavItem view='Login' onClick={() => this.props.reset()} />
    const SubmitReimbursement = <NavItem view='Submit Reimbursements' onClick={() => {
      this.props.setView('Submit Reimbursements');
      this.props.getUserReimbursements();
    }} />
    const UpdateReimbursements = <NavItem view='Update Reimbursements' onClick={() => {
      this.props.setReimbursements([]);
      this.props.setView('Update Reimbursements');
    }} />
    const UpdateUsers = <NavItem view='Update Users' onClick={() => this.props.setView('Update Users')} />
    const Logout = <NavItem view='Logout' onClick={() => this.props.reset()} />
    const Greeting = <div id='greeting'>Current User: {this.props.user['firstName']} {this.props.user['lastName']}</div>
    console.log('using roleid', this.props.roleid)
    switch (this.props.roleid) {
      // finance manager view
      case 2:
        return <nav id='navbar'> {Login} {SubmitReimbursement} {UpdateReimbursements} {Logout} {Greeting} </nav>
      // admin view
      case 1:
        return <nav id='navbar'> {Login} {SubmitReimbursement} {UpdateUsers} {Logout}  {Greeting} </nav>
      // no userID view
      case 0:
        return <nav id='navbar'> {Login} </nav>
      // default - standard user view
      default:
        return <nav id='navbar'> {Login} {SubmitReimbursement} {Logout}  {Greeting} </nav>
    }
  }
}