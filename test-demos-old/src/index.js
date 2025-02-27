// import React from 'react';
// import ReactDOM from 'react-dom';
import React from './custom-react/react';
import ReactDOM from './custom-react/react-dom';
import './index.css';

const element = (
  <div style={{ color: '#666' }} className="wrapper" data-unid="001">
    Simple React
    <p className="sub-wrapper">sub child</p>
    Other Text
  </div>
);
console.log(element)
ReactDOM.render(element, document.getElementById('root'));
