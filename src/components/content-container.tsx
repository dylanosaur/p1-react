import React from 'react';
import LoginForm from './LoginForm'
import SubmitReimbursementForm from './SubmitReimbursementForm'
import UserReimbursementsTable from './UserReimbursementsTable';
import UpdateReimbursementForm from './UpdateReimbursementForm';
import UpdateReimbursementsTable from './UpdateReimbursementsTable';
import UpdateUsersTable from './UpdateUsersTable';
import UpdateUsersForm from './UpdateUsersForm';
import NavBar from './NavBar';
import patch from '../utilities/patch';
import request from '../utilities/request'
import getRequest from '../utilities/getRequest'

class ResultsTable extends React.Component<any, any> {
  render() {
    console.log(this.props.view)
    switch (this.props.view) {
      case 'Login':
        return <div>Hello!</div>
      case 'Submit Reimbursements':
        return (<UserReimbursementsTable reimbursements={this.props.reimbursements} />)
      case 'Update Reimbursements':
        return (<UpdateReimbursementsTable reimbursements={this.props.reimbursements} updateReimbursement={this.props.updateFunction} />)
      case 'Update Users':
        return (<UpdateUsersTable users={this.props.users} updateUser={this.props.updateFunction} />)

      default:
        return <div>Yoyoyo</div>
    }
  }
}

class Form extends React.Component<any, any> {
  render() {
    switch (this.props.view) {
      case 'Login':
        return <LoginForm submitCredentials={this.props.submitAction} />
      case 'Submit Reimbursements':
        return <SubmitReimbursementForm submitReimbursement={this.props.submitAction} />
      case 'Update Reimbursements':
        return <UpdateReimbursementForm filterReimbursements={this.props.submitAction} />
      case 'Update Users':
        return <UpdateUsersForm filterUsers={this.props.submitAction} />
    }
  }
}



// this class could be improved quite a lot 
// here is a optional to-do list 

// rewrite the methods for filtering and getting reimbursements / users
// its 150 lines of code that could be compressed to 50 with refactoring out a few repeatedly used functions
// and fixing the filtering methods with slick 1 line filters or using functions
// the number of database calls can probably be reduced with better design

// add some kind of pagination feature - either use a bootstrap paginated table class or build one yourself and maintain
// the state in the container class - even just a single input that is 'display x results' is probably sufficient
// should speed up rendering significantly and prevent mega scroll bar

// delete cookies on logout - simple yes but not sure how

// logout users automatically after 5 or 10 mins of inactivity

// have the 'update reimbursements' page automically load only the pending reimbursements (as this is the default search option)

// try to determine why sometimes everything renders twice and fix it

// use personal getter/setters for messing with the state variables to improve readability and modularity

// think more carefully about what happens when the responses return empty arrays or errors and handle them explicitly

// re-order methods so code is less spaghettified and more linear in execution
export default class ContentContainer extends React.Component<any, any>{
  // main webpage container i.e. the body
  constructor(props: any) {
    super(props);
    this.state = { currentView: 'Login', userid: 0, roleid: 0, reimbursements: ['hello!'], users: [], currentUser: {} }
  }

  setStateToDefault = () => {
    this.setState({ currentView: 'Login', userid: 0, roleid: 0, reimbursements: ['hello!'], users: [], currentUser: {} })
  }

  setView = (view: string) => {
    this.setState({
      ...this.state,
      currentView: view
    })
  }
  setReimbursements = (r: any) => {
    this.setState({
      ...this.state,
      reimbursements: r
    })
  }

  getUserReimbursements = async () => {
    if (!this.state.userid) { return; }
    console.log('getting reimbursements for', this.state.userid)
    const url = 'http://ec2-18-222-87-238.us-east-2.compute.amazonaws.com:3000/reimbursements/author/userId/' + this.state.userid;
    console.log('using url', url);
    let response = await getRequest('get', url)
    //console.log('found some reimbursements', response);
    let data: any = []
    try { data = response.reverse() }
    catch{ }
    this.setState({
      ...this.state,
      reimbursements: data
    })
    return data
  }

  getFilteredReimbursements = async (filter: any) => {
    console.log('starting getFilteredReimb as user', this.state.userid)

    if (!this.state.userid) { return; }
    console.log('getting reimbursements for', filter)
    let filterURL: any = { 'userid': 'author/userId/', 'status': 'status/' }
    const url = 'http://ec2-18-222-87-238.us-east-2.compute.amazonaws.com:3000/reimbursements/' + filterURL[filter.field] + filter.value;
    console.log('using url', url);
    let response = await getRequest('get', url)
    //console.log('found some reimbursements', response);
    let data: any = []
    try { data = response.reverse() }
    catch{ }
    this.setState({
      ...this.state,
      reimbursements: data
    })
    return data.reverse()
  }

  getFilteredUsers = async (userid: any) => {
    if (!this.state.userid) { return; }
    console.log('getting users for', userid)
    const url = 'http://ec2-18-222-87-238.us-east-2.compute.amazonaws.com:3000/users/' + userid || '';
    console.log('using url', url);
    let response = await getRequest('get', url)
    //console.log('found some users', response);
    return response
  }

  submitReimbursement = async (amount: string, type: string, description: string) => {
    const typeid: any = { 'Lodging': 1, 'Travel': 2, 'Food': 3, 'Other': 4 }
    const url = 'http://ec2-18-222-87-238.us-east-2.compute.amazonaws.com:3000/reimbursements';
    const body = JSON.stringify({ "reimbursementId": 0, "author": this.state.userid, "amount": amount, "typeId": typeid[type], "description": description })
    console.log('request has body', body);
    let response = await request('post', url, body)
    this.getUserReimbursements();
    return response
  }

  submitCredentials = async (username: string, password: string) => {
    const url = 'http://ec2-18-222-87-238.us-east-2.compute.amazonaws.com:3000/login'
    const body = JSON.stringify({ "username": username, "password": password })
    console.log('request has body', body);
    let response = await request('post', url, body)
    this.setState({
      ...this.state,
      userid: response['userId'],
      roleid: response['roleId'],
      currentUser: response
    })
    if (this.state.userid && this.state.roleid) {
      this.getUserReimbursements();
      this.setState({
        ...this.state,
        currentView: 'Submit Reimbursements'
      })
    }
    return response
  }

  filterUsers = async (filters: any) => {

    let users = await this.getFilteredUsers(filters.userid);
    if (filters.userid) { users = [users] }
    console.log(filters, users)
    if (filters.email) {
      users = users.filter((x: any) => x.email.includes(filters.email))
    }
    users.sort((a: any, b: any) => (a.userId - b.userId))
    this.setState({
      ...this.state,
      users: users,
      userFilters: filters
    })
  }

  filterReimbursements = async (filters: any) => {
    // filters is an object with various reimbursement fields and some specifier that selects reimbursements
    // with data whose fields contain the subset in the corrresponding filter field
    filters = filters || { userid: 0, status: 'Pending' }
    this.setState({
      ...this.state,
      filters: filters
    })

    console.log(this.state.filters)
    // for now we will just filter by userid and status, since that is all the endpoints allow access to

    let statusOptions: any = { 'None': 0, 'Pending': 1, 'Approved': 2, 'Denied': 3 }
    let status: any = statusOptions[filters.status]

    let newReimbursements_status: any;
    let newReimbursements_userid: any;
    if (filters.userid) {
      newReimbursements_userid = await this.getFilteredReimbursements({ field: 'userid', value: filters.userid });
      if (!filters.status) {
        this.setState({
          ...this.state,
          reimbursements: newReimbursements_userid.reverse()
        })
      }
    }
    console.log('before status conditional', status);
    if (status) {
      console.log('beginning status conditional');
      newReimbursements_status = await this.getFilteredReimbursements({ field: 'status', value: status });
      if (!filters.userid) {
        this.setState({
          ...this.state,
          reimbursements: newReimbursements_status.reverse()
        })
      }
    }
    //console.log(newReimbursements_status, newReimbursements_userid);
    let objectIncludes = (array: any[], object: any) => {
      for (let element of array) {
        if (JSON.stringify(element) === JSON.stringify(object)) { return true }
      }
      return false;
    }
    if (status && filters.userid) {
      let newReimbursements = newReimbursements_status.filter((x: any) => objectIncludes(newReimbursements_userid, x))
      this.setState({
        ...this.state,
        reimbursements: newReimbursements.reverse()
      })
    }
  }

  updateReimbursement = async (reimbursementId: number, status: number) => {
    const url = 'http://ec2-18-222-87-238.us-east-2.compute.amazonaws.com:3000/reimbursements'
    const body = { "reimbursementId": reimbursementId, "statusId": status, "resolver": this.state.userid }
    console.log('request has body', body);
    await patch(url, body);
    //console.log(response)
    this.filterReimbursements(this.state.filters);
  }

  updateUser = async (updateUserBody: any) => {
    const url = 'http://ec2-18-222-87-238.us-east-2.compute.amazonaws.com:3000/users'
    if (!updateUserBody.password) { delete updateUserBody.password }
    console.log('request has body', updateUserBody);
    await patch(url, updateUserBody);
    //console.log(response)
    this.filterUsers(this.state.userFilters);
  }

  submitAction = () => {
    console.log('submit action for', this.state.currentView)
    switch (this.state.currentView) {
      case 'Login':
        return this.submitCredentials
      case 'Submit Reimbursements':
        return this.submitReimbursement
      case 'Update Reimbursements':
        return this.filterReimbursements
      case 'Update Users':
        return this.filterUsers
    }
  }

  updateAction = () => {
    console.log('update action for', this.state.currentView)
    switch (this.state.currentView) {
      case 'Update Reimbursements':
        return this.updateReimbursement
      case 'Update Users':
        return this.updateUser
    }
  }

  render() {
    return (
      <div id="content-container">
        <NavBar view={this.state.currentView} setView={this.setView} setReimbursements={this.setReimbursements}
          getUserReimbursements={this.getUserReimbursements} roleid={this.state.roleid} reset={this.setStateToDefault}
          user={this.state.currentUser} />
        <Form userid={this.state.userid} view={this.state.currentView} submitAction={this.submitAction()} />
        <ResultsTable view={this.state.currentView} users={this.state.users} reimbursements={this.state.reimbursements}
          updateFunction={this.updateAction()} key={Math.random()} />
      </div>
    );
  };
}