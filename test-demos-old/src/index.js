// import React from 'react';
// import ReactDOM from 'react-dom';
import React from './custom-react/react';
import ReactDOM from './custom-react/react-dom';
import MyFunctionComponent from './my-function-component';
import MyClassComponent from './my-class-component';
import './index.css';

// const element = (
//   <div style={{ color: '#666' }} className="wrapper" data-unid="001">
//     Simple React
//     <p className="sub-wrapper">sub child</p>
//     Other Text
//   </div>
// );
// console.log('VNode --->', element);
// ReactDOM.render(element, document.getElementById('root'));

ReactDOM.render(<MyClassComponent xx="child1" />, document.getElementById('root'));
