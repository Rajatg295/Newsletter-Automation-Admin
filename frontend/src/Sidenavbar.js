// src/components/Sidenavbar.js
import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelopeOpenText, 
  faChartLine, 
  faFileAlt, 
  faMailBulk, 
  faClipboardList, 
  faInbox,
  faPlus,
  faKey,
  faList
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { AppContext } from './context/AppContext';

const Sidenavbar = () => {
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const { login, setLogin } = useContext(AppContext);

  const toggleUserManagement = () => {
    setIsUserManagementOpen(!isUserManagementOpen);
  };

  const handleLogout = async () => {
    await localStorage.removeItem("Admin");
    setLogin(false);
  };

  return (
    <>
      {login ? (
        <div className="w-64 bg-gray-800 text-white fixed h-screen shadow-lg">
          <ul className="space-y-8 p-8">
            <li>
              <button
                className="w-full text-left focus:outline-none flex items-center"
                onClick={toggleUserManagement}
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                User Management
              </button>
              {isUserManagementOpen && (
                <ul className="pl-6 space-y-8 mt-8">
                  <li className="flex items-center">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    <Link to="/user-management/add" className="hover:text-gray-400">Add</Link>
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon icon={faKey} className="mr-2" />
                    <Link to="/user-management/permissions" className="hover:text-gray-400">Permissions</Link>
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon icon={faList} className="mr-2" />
                    <Link to="/user-management/list" className="hover:text-gray-400">List</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faEnvelopeOpenText} className="mr-2" />
              <Link to="/email-scheduling" className="hover:text-gray-400">Email Scheduling</Link>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faChartLine} className="mr-2" />
              <Link to="/email-tracking" className="hover:text-gray-400">Email Tracking</Link>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
              <Link to="/report-generation" className="hover:text-gray-400">Report Generation</Link>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faMailBulk} className="mr-2" />
              <Link to="/email-collection" className="hover:text-gray-400">Email Collection</Link>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
              <Link to="/templates" className="hover:text-gray-400">Templates</Link>
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faInbox} className="mr-2" />
              <Link to="/inbox" className="hover:text-gray-400">Inbox</Link>
            </li>
          </ul>
        </div>
      ) : null}
    </>

    
  );
};

export default Sidenavbar;
