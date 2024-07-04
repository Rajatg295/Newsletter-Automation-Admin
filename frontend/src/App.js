import { Route, Routes } from 'react-router-dom';
import './App.css';
import Adduserform from './Adduserform';
import Admindashboard from './Admindashboard';
import LoginForm from './LoginForm';
import Header from './Header';
import Sidenavbar from './Sidenavbar';
import Footer from './Footer';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import Permissions from './Permissions';
import EmailCollection from './EmailCollection';
import ListUsers from './ListUsers';

function App() {
  const { login } = useContext(AppContext);

  return (
    <>
      <Header />
      <div className="app-container bg-[#f4f5f7]">
        <div className="container-fluid mx-auto flex flex-col min-h-screen">
          <div className="flex flex-grow">
            {login && (
              <div className="hidden md:block w-64 bg-gray-800 text-white shadow-lg transition-all duration-300 ease-in-out">
                <Sidenavbar />
              </div>
            )}
            <main className="flex-1">
              <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/" element={<Admindashboard />} />
                <Route path="/user-management/add" element={<Adduserform />} />
                <Route path="/user-management/permissions" element={<Permissions />} />
                <Route path="/email-collection" element={<EmailCollection />} />
                <Route path="/user-management/list" element={<ListUsers />} />
              </Routes>
            </main>
          </div>
          {login && <Footer />}
        </div>
      </div>
    </>
  );
}

export default App;
