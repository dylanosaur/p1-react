import React from 'react'

export default class UpdateReimbursementsTable extends React.Component<any,any> { 

  constructor(props:any){
    super(props);
    this.state = { 
      userid: 0,
    }
  }

  convertUnixTime(time:string) { 
    if (!Number(time)){
      return ''
    }
    var newDate = new Date();
    newDate.setTime(Number(time));
    return newDate.toUTCString().substring(0, 16);
  }
  
  updateInputValue = (event: any) => {
    console.log(event)
    let status:any = {'None':0, 'Pending':1, 'Approved':2, 'Denied':3}
    let newState:any = {}
    newState[event.target.id] = status[event.target.value];
    this.setState({...this.state, ...newState})
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
              <th scope="col">user ID</th>
              <th scope="col">Amount</th>
              <th scope="col">Type</th>
              <th scope="col">Description</th>
              <th scope="col">Date Submitted</th>
              <th scope="col">Date Resolved</th>
              <th scope="col">Resolver ID</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
            <tbody>
            {this.props.reimbursements.map((x:any) => 
            <tr key={'r'+x.reimbursementId}>
              <td>{x.reimbursementId}</td>
              <td>{x.author}</td>
              <td>{x.amount}</td>
              <td>{type[x.typeId]}</td>
              <td>{x.description}</td>
              <td>{this.convertUnixTime(x.dateSubmitted)}</td>
              <td>{this.convertUnixTime(x.dateResolved)}</td>
              <td>{x.resolver}</td>
              <td>
                <select id={'status'+x.reimbursementId} name='type' 
                  value={status[this.state['status'+x.reimbursementId]||x.statusId]} onChange={this.updateInputValue} >
                  <option value='Pending'>Pending</option>
                  <option value='Approved'>Approved</option>
                  <option value='Denied'>Denied</option>
                </select>
              </td>
              <td>
              <button id={'update'+x.reimbursementId} onClick={() => this.props.updateReimbursement(x.reimbursementId, this.state['status'+x.reimbursementId]||x.statusId)}>Submit</button>
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}