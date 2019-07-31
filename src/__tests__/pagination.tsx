import React from 'react';
import { shallow, mount, render } from 'enzyme';

import ContentContainer from '../components/content-container';
import PaginationBar from '../components/PaginationBar'
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
configure({ adapter: new Adapter() });

class MyList extends React.Component<any, any> {
  render() {
    return (
      <ol>
        {this.props.items.map((x: any) => <li key={x}>x</li>)}
      </ol>
    )
  }
}

class MyContainer extends React.Component<any, any> { 
  constructor(props:{}) { 
    super(props);
    let items:any = []
    for (let i = 0; i < 100; i++) { items.push(i); }
    this.state = {items: items, paginationValue:25}
  }
  paginate =  (pile:any) => {
    let items:any = []
    for (let i = 0; i < this.state.paginationValue; i++) { items.push(pile[i]); }
    return items
  }
  updatePagination = (value:number) => {
    this.setState({ ...this.state, paginationValue:value})
  }
  render() {
    return(
      <div>
        <PaginationBar updatePagination={this.updatePagination} paginationValue={this.state.paginationValue}/>
        <MyList items={this.paginate(this.state.items)} />
      </div>
    ) 
  }
}

describe('ContentContainer', () => {
  let wrapper;
  // first a few simple tests to build confidence
  it('should render correctly with no props', () => {
    wrapper = mount(<ContentContainer />);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
  it('should contain a navigation bar child', () => {
    wrapper = mount(<ContentContainer />);
    expect(wrapper.find('NavBar').length).toEqual(1);
    wrapper.unmount()
  });
  it('should have a navbar with 1 button - login - when initially loaded', () => {
    wrapper = mount(<ContentContainer />)
    expect(wrapper.find('NavBar').find('NavItem').length).toEqual(1);
    wrapper.unmount();
  })
  it('does not display Pagination Bar on default page', () => {
    wrapper = mount(<ContentContainer />);
    expect(wrapper.find('PaginationBar').length).toEqual(0);
    wrapper.unmount();
  })    
  it('should show 25 items initially', () => {
    wrapper = mount(<MyContainer />)
    expect(wrapper.find('MyList').find('ol').find('li').length).toEqual(25);
    wrapper.unmount()
  })

  // lets describe a paginator feature that we want to add
  describe('PaginationBar', () => {
    it('should contain a text input box', () => {
      wrapper = mount(<PaginationBar />);
      expect(wrapper.find('input').props().type).toBe('text');
      wrapper.unmount();
    })
    it('should have a label that says # Reimbursements Displayed', () => {
      wrapper = mount(<PaginationBar />);
      expect(wrapper.find('label').text()).toBe('Reimbursements Displayed');
      wrapper.unmount();
    })
    it('should initially be set to 25', () => {
      wrapper = mount(<PaginationBar />);
      expect(wrapper.find('input').props().value).toBe(25);
      wrapper.unmount();
    })
    it('should change the value in the box to match the value passed in', () => { 
      wrapper = mount(<PaginationBar paginationValue={50}/>);
      expect(wrapper.find('input').props().value).toBe(50);
      wrapper.unmount();
    })
  })

  // it would be nice to have the navbar turn grey when it is the active view
})
