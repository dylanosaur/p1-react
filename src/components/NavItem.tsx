import React from 'react'

export default class NavItem extends React.Component<any, any> {
  // buttons for the nav menu
  render() {
    return (
      <button onClick={() => this.props.onClick()} id={this.props.view + '-button'} 
        className={this.props.colorClass}>{this.props.view}</button>
    )
  }
}
