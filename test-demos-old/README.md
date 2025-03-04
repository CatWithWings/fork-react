## 参考
[杨艺韬讲堂](https://www.yangyitao.com/react18/)

## 课堂笔记

### React Element
由babel解析jsx语法，转译为createElement的调用，最终得到一个VNode
```javascript
// jSX 语法
const element = (
  <div style={{ color: '#666' }} className="wrapper" data-unid="001">
    Simple React
    <p className="sub-wrapper">sub child</p>
    Other Text
  </div>
);
ReactDOM.render(element, document.getElementById('root'));

// 转译后
const element = React.createElement("div", {
  style: {
    color: '#666'
  },
  className: "wrapper",
  "data-unid": "001"
}, "Simple React", React.createElement("p", {
  className: "sub-wrapper"
}, "sub child"), "Other Text");

ReactDOM.render(element, document.getElementById('root'));
```

### React Function Component
由babel解析jsx语法，转译为一个返回值是React.createElement执行结果的函数，需要在createDOM中手动调用才能得到真正需要的VNode
```javascript
// 函数组件
function MyFunctionComponent(props) {
  return (
    <div className="my-component-wrapper">
      MyFunctionComponent
    </div>
  );
}
ReactDOM.render(<MyFunctionComponent xx="child" />, document.getElementById('root'));

// 转译后
function MyFunctionComponent(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "my-component-wrapper"
  }, "MyFunctionComponent");
}

ReactDOM.render(React.createElement(MyFunctionComponent, { xx: 'child' }), document.getElementById('root'));
```
###  React Class Component
由babel解析jsx语法，转译为一个继承自React.Component的类，需要在createDOM中手动调用才能得到真正需要的VNode
```javascript
// 类组件
class MyClassComponent extends React.Component {
  render() {
    return (
      <div>123</div>
    )
  }
}
ReactDOM.render(<MyClassComponent xx="child" />, document.getElementById('root'));

// 转译后
class MyClassComponent extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, "123");
  }
}
ReactDOM.render(/*#__PURE__*/React.createElement(MyClassComponent, {
  xx: "child"
}), document.getElementById('root'));
```
