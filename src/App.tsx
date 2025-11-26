import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClientList from './components/ClientList';
import ClientDetails from './components/ClientDetails';
import './App.css'

function App() {
  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <nav style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <Link to="/" style={{ marginRight: '10px', fontWeight: 'bold' }}>Dashboard</Link>
        </nav>

        <Routes>

          <Route path="/" element={<ClientList />} />
          <Route path="/client/:id" element={<ClientDetails />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App
