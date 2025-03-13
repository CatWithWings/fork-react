import React from './custom-react/react';

export default class MyChildClassComponent extends React.Component {
  someHandle() {
    console.log('ChildClassComponent someHandle exec');
  }

  render() {
    return (
      <div>
        My Child ClassComponent
      </div>
    );
  };
}
