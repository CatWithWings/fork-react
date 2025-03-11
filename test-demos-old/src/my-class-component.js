import React from './custom-react/react';

export default class MyClassComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 1,
    };
  }

  handleClick() {
    const currentState = this.state;
    this.setState({
      count: currentState.count + 1,
    });
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <h1 style={{ color: 'orange' }}>Class Component</h1>
        <span>props: {this.props.xx}</span>
        <div 
          style={{ cursor: 'pointer' }} 
          onClick={() => this.handleClick()}
        >
          Click Me {count}
        </div>
      </div>
    );
  };
}
