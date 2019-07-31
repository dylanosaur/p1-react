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
import PaginationBar from './PaginationBar';

class ResultsTable extends React.Component<any, any> {
  render() {
    //console.log('rerendering Results table for view', this.props.view, 'found reimb array of length', this.props.reimbursements.length);
    switch (this.props.view) {
      case 'Login':
        return <div>Hello!</div>
      case 'Submit Reimbursements':
        return (
          <div>
            <PaginationBar updatePagination={this.props.updatePagination} paginationValue={this.props.paginationValue}/>
            <UserReimbursementsTable reimbursements={this.props.reimbursements} />
          </div>
        )
      case 'Update Reimbursements':
        return (
          <div>
            <PaginationBar updatePagination={this.props.updatePagination} paginationValue={this.props.paginationValue}/>
            <UpdateReimbursementsTable reimbursements={this.props.reimbursements} updateReimbursement={this.props.updateFunction} />
          </div>
        )
      case 'Update Users':
        return (<UpdateUsersTable users={this.props.users} updateUser={this.props.updateFunction} />)

      default:
        return <div>Yoyoyo</div>
    }
  }
}

class Form extends React.Component<any, any> {
  render() {
    //console.log('rerendering Forms table for view', this.props.view);
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
    this.state = {
      currentView: 'Login', userid: 0, roleid: 0, reimbursements: [], users: [],
      currentUser: {}, filters: { userid: 0, status: 'Pending' },
      paginationValue:25
    }
  }

  setStateToDefault = () => {
    this.setState({
      currentView: 'Login', userid: 0, roleid: 0, reimbursements: [], users: [],
      currentUser: {}, filters: { userid: 0, status: 'Pending' },
      paginationValue:25
    })
  }

  setUser = (userData: any) => {
    this.setState({
      ...this.state,
      userid: userData.userid,
      roleid: userData.roleid,
      currentUser: userData.currentUser
    })
  }
  setView = (view: string) => {
    this.setState({
      ...this.state,
      currentView: view
    })
  }

  setFilters = (filters: string) => {
    this.setState({
      ...this.state,
      filters: filters
    })
  }

  setReimbursements = (reimbursements: any) => {
    this.setState({
      ...this.state,
      reimbursements: reimbursements
    })
  }

  updatePagination = (value:number) => {
    this.setState({ ...this.state, paginationValue:value})
  }

  paginate =  (pile:any) => {
    let items:any = []
    for (let i = 0; i < this.state.paginationValue; i++) { items.push(pile[i]); }
    return items
  }

  getReimbursements = async (params: any) => {
    const data: any = {};
    const statuses: any = { 'None': 0, 'Pending': 1, 'Approved': 2, 'Denied': 3 }
    const statusid = statuses[params.status]
    const URL = 'http://ec2-18-222-87-238.us-east-2.compute.amazonaws.com:3000/reimbursements/';
    //console.log('using filters', params)
    if (!params.userid && !statusid){ 
      data.reimbursements = [];
      alert('Atleast one filter must be specified');
    }
    if (params.userid) {
      let relativeURL = `author/userId/${params.userid}`;
      data.userid = await getRequest('get', URL + relativeURL);
      if (data.userid.msg || data.userid.error) { data.userid = [] }
    }
    if (statusid) {
      let relativeURL = `status/${statusid}`;
      data.statusid = await getRequest('get', URL + relativeURL);
      if (data.statusid.msg || data.statusid.error) { data.roleid = [] }
    }
    if (statusid && params.userid) {
      data.reimbursements = data.userid.filter((r: any) => data.statusid.includes(r));
    } else { data.reimbursements = data.userid || data.statusid; }
    if (!data.reimbursements) { data.reimbursements = await getRequest('get', URL) }
    return data.reimbursements.reverse()
  }

  postReimbursement = async (amount: string, type: string, description: string) => {
    const typeid: any = { 'Lodging': 1, 'Travel': 2, 'Food': 3, 'Other': 4 }
    const url = 'http://ec2-18-222-87-238.us-east-2.compute.amazonaws.com:3000/reimbursements';
    const body = JSON.stringify({ "reimbursementId": 0, "author": this.state.userid, "amount": amount, "typeId": typeid[type], "description": description })
    ////console.log('request has body', body);
    await request('post', url, body);
  }

  submitReimbursement = async (amount: string, type: string, description: string) => {
    await this.postReimbursement(amount, type, description);
    const reimbursements: any = await this.getReimbursements({ userid: this.state.userid });
    this.setReimbursements(reimbursements);
  }

  getUserReimbursements = async () => {
    const reimbursements = await this.getReimbursements({ userid: this.state.userid })
    //console.log('found some reimbursements for user', reimbursements.length)
    this.setReimbursements(reimbursements);
  }

  filterReimbursements = async (filters: any) => {
    this.setFilters(filters);
    //console.log('using filters', filters, 'for filterReimbursements method')
    const reimbursements: any = await this.getReimbursements(filters);
    //console.log('filter reimbursements gives new # reimbursements', reimbursements.length)
    this.setReimbursements(reimbursements);
  }

  displayDefaultReimbursements = async () => {
    const filters: any = { userid: 0, status: 'Pending' }
    this.setFilters(filters)
    await this.filterReimbursements({ userid: 0, status: 'Pending' });
  }

  updateReimbursement = async (reimbursementId: number, status: number) => {
    const url = 'http://ec2-18-222-87-238.us-east-2.compute.amazonaws.com:3000/reimbursements'
    const body = { "reimbursementId": reimbursementId, "statusId": status, "resolver": this.state.userid }
    //console.log('request has body', body);
    await patch(url, body);
    const reimbursements = await this.getReimbursements(this.state.filters);
    this.setReimbursements(reimbursements);
  }

  getFilteredUsers = async (userid: any) => {
    if (!this.state.userid) { return; }
    //console.log('getting users for', userid)
    const url = 'http://ec2-18-222-87-238.us-east-2.compute.amazonaws.com:3000/users/' + userid || '';
    //console.log('using url', url);
    let response = await getRequest('get', url)
    ////console.log('found some users', response);
    return response
  }

  submitCredentials = async (username: string, password: string) => {
    const url = 'http://ec2-18-222-87-238.us-east-2.compute.amazonaws.com:3000/login'
    const body = JSON.stringify({ "username": username, "password": password })
    console.log('request has body', body);
    try {
      let response = await request('post', url, body)
      this.setUser({ userid: response['userId'], roleid: response['roleId'], currentUser: response });
      const reimbursements = await this.getReimbursements({ userid: response['userId'] });
      this.setReimbursements(reimbursements);
      this.setView('Submit Reimbursements');
    } catch (error) {
      console.log('login failed due to:', error);
      //alert('invalid credentials');
    }
  }

  filterUsers = async (filters: any) => {
    let users = await this.getFilteredUsers(filters.userid);
    if (filters.userid) { users = [users] }
    //console.log(filters, users)
    if (filters.email) { users = users.filter((x: any) => x.email.includes(filters.email)) }
    users.sort((a: any, b: any) => (a.userId - b.userId))
    this.setState({
      ...this.state,
      users: users,
      userFilters: filters
    })
  }

  updateUser = async (updateUserBody: any) => {
    const url = 'http://ec2-18-222-87-238.us-east-2.compute.amazonaws.com:3000/users'
    if (!updateUserBody.password) { delete updateUserBody.password }
    //console.log('request has body', updateUserBody);
    await patch(url, updateUserBody);
    ////console.log(response)
    this.filterUsers(this.state.userFilters);
  }

  submitAction = () => {
    //console.log('assigning submit action for', this.state.currentView)
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
    //console.log('assigning update action for', this.state.currentView)
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
        <NavBar 
          view={this.state.currentView} 
          setView={this.setView} 
          displayDefaultReimbursements={this.displayDefaultReimbursements}
          getUserReimbursements={this.getUserReimbursements} 
          roleid={this.state.roleid} 
          reset={this.setStateToDefault}
          user={this.state.currentUser} />
        <Form 
          userid={this.state.userid} 
          view={this.state.currentView} 
          submitAction={this.submitAction()} 
          key={Math.random()} />
        <ResultsTable 
          view={this.state.currentView} 
          users={this.state.users} 
          reimbursements={this.paginate(this.state.reimbursements)}
          updateFunction={this.updateAction()} 
          key={Math.random()} 
          updatePagination={this.updatePagination}
          paginationValue={this.state.paginationValue} />
      </div>
    );
  };
}