import React from 'react'

export default class UserReimbursementsTable extends React.Component<any,any> { 


  convertUnixTime(time:string) { 
    if (!Number(time)){
      return ''
    }
    var newDate = new Date();
    newDate.setTime(Number(time));
    return newDate.toUTCString().substring(0, 16);
  }
  render() { 
    let type:any = {1:'Lodging', 2:'Travel', 3:'Food', 4:'Other'}
    let status:any = {1: 'Pending', 2: 'Approved', 3: 'Denied'}
    return(
      <div id='user-reimbursement-table'>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Amount</th>
              <th scope="col">Type</th>
              <th scope="col">Description</th>
              <th scope="col">Date Submitted</th>
              <th scope="col">Date Resolved</th>
              <th scope="col">Resolver</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
            <tbody>
            {this.props.reimbursements.map((x:any) => 
            <tr>
              <td>{x.reimbursementId}</td>
              <td>{x.amount}</td>
              <td>{type[x.typeId]}</td>
              <td>{x.description}</td>
              <td>{this.convertUnixTime(x.dateSubmitted)}</td>
              <td>{this.convertUnixTime(x.dateResolved)}</td>
              <td>{x.resolver}</td>
              <td>{status[x.statusId]}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}