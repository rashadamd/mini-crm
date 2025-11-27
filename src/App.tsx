import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ClientList from './components/ClientList';
import ClientDetails from './components/ClientDetails';
import './App.css'

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link 
      to={to} 
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
      }`}
    >
      {children}
    </Link>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <span className="text-xl font-bold text-indigo-600 tracking-tight">Mini CRM</span>
              <div className="flex gap-2">
                <NavLink to="/">Dashboard</NavLink>
              </div>
            </div>
          </div>
        </nav>

        {/* Client List */}
        <main className="max-w-5xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<ClientList />} />
            <Route path="/client/:id" element={<ClientDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;