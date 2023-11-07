import './App.css';
import './MyCss/MyCustomStylesheet.css'
import 'font-awesome/css/font-awesome.min.css';
import About from './Components/About';
import Contact from './Components/Contact';
import Layout from './Components/Layout';
import Main from './Components/Main';
import Portfolio from './Components/Portfolio';
import SignIn from './Components/SignIn';
import VetRoBot from './Components/VetRoBot';
import { RouterProvider, createHashRouter } from "react-router-dom"
import PageMissing from './Components/PageMissing';
import MyContextProvider, { MyContext } from './Components/ContextProvider';
import Chat from './Components/Chat';
import Room from './Components/Room';



function App() {
  
  let Routes = createHashRouter([
    {
      path: '/', element: <Layout />, children: [
        { path: "/", element: <Main /> },
        { path: "home", element: <Main /> },
        { path: "SignIn", element: <SignIn /> },
        { path: "VetRoBot", element: <VetRoBot /> },
        { path: "portfolio", element: <Portfolio /> },
        { path: "chat", element: <Chat /> },
        { path: "room", element: <Room /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "*", element: <PageMissing /> },
      ]
    },


  ])
  return (
    <MyContextProvider>
      <div className='myWidth'>
        <RouterProvider router={Routes} />
      </div>
    </MyContextProvider>
  );
}

export default App;
/****************************************** */
/****************************************** */
/****************************************** */
