import React from 'react';

export default class PaginationBar extends React.Component<any, any> { 
    constructor(props:any) { 
        super(props);
        this.state = {value: this.props.paginationValue};
    }
    handleChange = (event:any) => { 
        console.log(event.target.value);
        this.setState({value:event.target.value})
    }
    handleKeyDown = (event:any) => {
        if (event.key === "Enter") {
            let value = event.target.value;
            this.setState({value})
            this.props.updatePagination(value);
        }
      
    }
    render() { 
        return (
        <div id='pagination-div'>
            <input id='pagination-input' type='text' onChange={this.handleChange} value={this.state.value} onKeyPress={this.handleKeyDown}/>
            <label htmlFor='pagination-input' > &lt;-- Or Fewer Reimbursements Displayed</label>
        </div>
        )
    }
}