import { Component } from 'react';

export default class MySuspense extends Component {
  state = {
    isRender: true,
    loadingError: false,
    errorResolved: false,
  }
  
  componentDidCatch(error) {
    if (error instanceof Promise && !this.state.errorResolved) {
      error.then(() => {
        this.setState({
          loadingError: false,
          isRender: true,
          errorResolved: true,
        });
      }).catch(() => {
        this.setState({
          loadingError: true,
          isRender: false,
          errorResolved: true,
        });
      })
    }
  }
  
  render() {
    const { children, fallback = <div>Suspense</div> } = this.props;
    const { isRender  } = this.state;
    return isRender ? children : fallback;
  }
}
