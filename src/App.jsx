import './App.css';
import './MyCss/MyCustomStylesheet.css'
import 'font-awesome/css/font-awesome.min.css';
import About from './Components/About';
import Contact from './Components/Contact';
import Layout from './Components/Layout';
import Main from './Components/Main';
import SignIn from './Components/SignIn';
import VetRoBot from './Components/VetRoBot';
import { RouterProvider, createHashRouter } from "react-router-dom"
import PageMissing from './Components/PageMissing';
import MyContextProvider, { MyContext } from './Components/ContextProvider';
import Chat from './Components/Chat';
import Room from './Components/Room';
import Pets from './Components/Pets';
import { ToastContainer } from 'react-toastify';
import AddClinic from './Components/AddClinic';
import SpeciesIdentifier from './Components/SpeciesIdentifier';
import { useEffect } from 'react';
import Profile from './Components/Profile';
import Sidebar from './Components/Sidebar';
import Contacts from './Components/ChatComponents/Contacts';
import ChatContainer from './Components/ChatComponents/ChatContainer';
import UserChoicePage from './Components/UserChoicePage';
import Login from './Components/LogIn';
import UserAppointments from './Components/UserAppointments';
import Loading from './Components/Loading';


function App() {
  let Routes = createHashRouter([
    {
      path: '/', element: <Layout />, children: [
        { path: "/", element: <Main /> },
        { path: "home", element: <Main /> },
        { path: "SignIn", element: <SignIn /> },
        { path: "Login", element: <Login /> },
        { path: "VetRoBot", element: <VetRoBot /> },
        { path: "chat", element: <Chat /> },
        { path: "room", element: <Room /> },
        { path: "about", element: <About /> },
        { path: "Contacts", element: <ChatContainer /> },
        { path: "loadingTest", element: <Loading /> },
        { path: "userAppointments", element: <UserAppointments /> },
        { path: "contact", element: <Contact /> },
        { path: "choice", element: <UserChoicePage /> },
        { path: "SignIn/pets", element: <Pets /> },
        { path: "SignIn/clinic", element: <AddClinic/>},
        { path: "SpeciesIdentifier", element: <SpeciesIdentifier/>},
        { path: "profile", element: <Profile />},
        { path: "*", element: <PageMissing /> },

      ]
    },


  ])
  return (
    <MyContextProvider>
      <ToastContainer />
      <div className='App-header '>
        <RouterProvider router={Routes} />
      </div>
    </MyContextProvider>
  );
}

export default App;


// 11/12/2023 7:40pm nour
