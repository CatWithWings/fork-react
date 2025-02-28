## 参考
[杨艺韬讲堂](https://www.yangyitao.com/react18/)

## 课堂笔记

### React Element
由babel解析jsx语法，去递归的调用createElement，最终得到一个VNode
```javascript
// jSX 语法
const element = (
  <div style={{ color: '#666' }} className="wrapper" data-unid="001">
    Simple React
    <p className="sub-wrapper">sub child</p>
    Other Text
  </div>
);

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
```

### React Function Component
由babel解析jsx语法，去调用转译后的MyFunctionComponent，最终返回一个React.createElement函数，需要在createDOM中手动调用才能得到真正需要的VNode
```javascript
// 函数组件
function MyFunctionComponent(props) {
  return (
    <div className="my-component-wrapper">
      MyFunctionComponent
    </div>
  );
}
// 转译后
function MyFunctionComponent(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "my-component-wrapper"
  }, "MyFunctionComponent");
}
```
