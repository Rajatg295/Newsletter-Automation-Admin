  import React, { useContext } from 'react';
  import userProfileImage from './logo1.png';
  import { AppContext } from './context/AppContext';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
  import { useNavigate } from 'react-router-dom';

  const Header = () => {
      const { login, setLogin, username } = useContext(AppContext);
      const navigate = useNavigate();

      const handleLogout = async () => {
        await localStorage.removeItem('Admin');
        navigate("/login")
        setLogin(false);
      };

    return (
      <>
      {login ? (
      <header className="bg-blue-800 text-white ml-[256px] h-16 flex items-center fixed top-0 left-0 w-full pl-4 pr-[300px] shadow-lg">
        <div className="flex-1 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Admin Dashboard - Newsletter</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img src={userProfileImage} alt="User Profile" className="w-8 h-8 rounded-full" />
              <span className="text-sm font-medium">{username || 'Username'}</span> 
              </div>
              <button
            onClick={handleLogout}
            className="flex items-center p-2 rounded bg-red-500 hover:bg-red-600 text-white"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </button>

          </div>
        </div>
      </header>
      ) :(
          <>

          </>
      )}
      
      </>

      
    );
  };

  export default Header;



  // import React from 'react';

  // const Header = () => {
  //   return (
  //     <header className="header">
  //       <h1>Header</h1>
  //     </header>
  //   );
  // };

  // export default Header;
