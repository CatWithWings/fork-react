import React from './custom-react/react';
import MyChildClassComponent from './my-child-class-component';

export default class MyClassComponent extends React.Component {
  constructor(props) {
    super(props);

    this.headerRef = React.createRef();
    this.childClassRef = React.createRef();
    this.state = {
      count: 1,
    };
  }

  handleClick() {
    const currentState = this.state;
    this.setState({
      count: currentState.count + 1,
    });

    // 输出原生标签的ref
    console.log('h1 dom ref --->', this.headerRef.current);
    
    // 调用子class组件的内部方法
    this.childClassRef.current?.someHandle?.();
  }

  // render() {
  //   const { count } = this.state;
  //   return (
  //     <div>
  //       <h1 ref={this.headerRef} style={{ color: 'orange' }}>Class Component</h1>
  //       <span>props: {this.props.xx}</span>
  //       <div
  //         style={{ cursor: 'pointer' }}
  //         onClick={() => this.handleClick()}
  //       >
  //         Click Me {count}
  //       </div>
  //       <MyChildClassComponent ref={this.childClassRef} />
  //     </div>
  //   );
  // };
  
  render() {
    const { count } = this.state;
    return (
      <div>
        <h1 ref={this.headerRef} style={{ color: 'orange' }}>DIV</h1>
        <div>SPAN</div>
      </div>
    );
  };
}
