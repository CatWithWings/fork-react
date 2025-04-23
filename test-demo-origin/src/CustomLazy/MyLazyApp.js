import React, { Suspense } from 'react';
import MyLazy from './MyLazy';
import MySuspense from './MySuspense';

const TestLazy = MyLazy(() => import('./TestLazy.js'));
// const TestLazy = React.lazy(() => import('./TestLazy.js'));

function MyLazyApp() {
  return (
    <div>
      App
      <MySuspense fallback={<div>Loading</div>}>
        <TestLazy />
      </MySuspense>
    </div>
  );
}

export default MyLazyApp;
