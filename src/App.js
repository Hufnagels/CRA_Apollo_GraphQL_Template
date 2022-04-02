import React from 'react';

// Material

// Custom
import ResponsiveAppBar from './components/AppBar';
import Users from './components/Users';

const App = () => {
  return (
    <React.Fragment>
      <ResponsiveAppBar />
      <Users />
    </React.Fragment>
  );
}

export default App;

