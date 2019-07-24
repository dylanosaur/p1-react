import * as React from 'react';







export default class ContentContainer extends React.Component{

  constructor(props:any){ 
    super(props);
    this.state = { currentView: 'Login' }
  }

  handleLogin:any = (view:any) => {
    this.setState({currentView: 'Login'});
    alert(view);
  };

  handleClick:any = (view:String) => {
    this.setState({currentView: view});
    alert(view);
  };

  NavItem = (props:any) => {
    return <button onClick={() => props.clickFunction(props.view)} id={props.view+'-button'}>{props.view}</button>
  } 


  render() { 
    return(
      <div id="content-container">
        {/* Options: Login, Submit Reimbursement, Update Reimbursements, Update Users 
            Should spread the full width of page, should have buttons that update/hide content being displayed */}
        <this.NavItem view='Login' hidden={false} clickFunction={this.handleClick} />
        <this.NavItem view='Submit Reimbursements' clickFunction={this.handleClick} hidden={true}/>
        <this.NavItem view='Update Reimbursements' clickFunction={this.handleClick} hidden={true}/>
        <this.NavItem view='Update Users' clickFunction={this.handleClick} hidden={true}/>
      </div>
    );
  };
}