## 参考

[杨艺韬讲堂](https://www.yangyitao.com/react18/)

## 课堂笔记

### React Element

由babel解析jsx语法，转译为createElement的调用，最终得到一个VNode

```javascript
// 编译前
const element = (
  <div style={{ color: '#666' }} className="wrapper" key="testKey">
    Simple React
    <p className="sub-wrapper">sub child</p>
    Other Text
  </div>
);
const root = createRoot(document.getElementById('root'));
ReactDOM.render(element);

// 编译后
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const element = /*#__PURE__*/_jsxs("div", {
  style: {
    color: '#666'
  },
  className: "wrapper",
  children: ["Simple React", /*#__PURE__*/_jsx("p", {
    className: "sub-wrapper",
    children: "sub child"
  }), "Other Text"]
}, 'testKey');
const root = createRoot(document.getElementById('root'));
ReactDOM.render(element);
```


React Function Component

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
const root = createRoot(document.getElementById('root'));
ReactDOM.render(<MyFunctionComponent />);

// 转译后
import { jsx as _jsx } from "react/jsx-runtime";
function MyFunctionComponent(props) {
  return /*#__PURE__*/_jsx("div", {
    className: "my-component-wrapper",
    children: "MyFunctionComponent"
  });
}
const root = createRoot(document.getElementById('root'));
ReactDOM.render(/*#__PURE__*/_jsx(MyFunctionComponent, {}));
```

### React Class Component

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
const root = createRoot(document.getElementById('root'));
ReactDOM.render(<MyClassComponent />);

// 转译后
import { jsx as _jsx } from "react/jsx-runtime";
class MyClassComponent extends React.Component {
  render() {
    return /*#__PURE__*/_jsx("div", {
      children: "123"
    });
  }
}
const root = createRoot(document.getElementById('root'));
ReactDOM.render(/*#__PURE__*/_jsx(MyClassComponent, {}));
```
