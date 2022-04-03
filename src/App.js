import React from 'react';

// Material

// Custom
import ResponsiveAppBar from './Layout/AppBar';
import UsersListIndex from './components/Users/UsersListIndex';

const App = () => {
  return (
    <React.Fragment>
      <ResponsiveAppBar />
      <UsersListIndex />
    </React.Fragment>
  );
}

export default App;

