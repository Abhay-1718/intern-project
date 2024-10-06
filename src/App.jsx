
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserTable from './components/UserTable';
import UserDetail from './components/UserDetail';


const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>
        <Routes>
          <Route path="/" element={<UserTable />} />
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
