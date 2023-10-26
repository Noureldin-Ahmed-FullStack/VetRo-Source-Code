import './App.css';
import About from './Components/About';
import './MyCss/MyCustomStylesheet.css'
import Contact from './Components/Contact';
import Layout from './Components/Layout';
import Main from './Components/Main';
import Portfolio from './Components/Portfolio';
import { RouterProvider, createHashRouter } from "react-router-dom"


function App() {
 
  let Routes = createHashRouter([
    {
      path: '/', element: <Layout />, children: [
        { path: "/", element: <Main /> },
        { path: "home", element: <Main /> },
        { path: "portfolio", element: <Portfolio /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "*", element: <h2>404</h2> },
      ]
    },


  ])
  return (
    <div className='myWidth'>
      {/* <NavbarComponent /> */}
      {/* <Main /> */}
     
        <RouterProvider router={Routes} />
      
      {/* <Portfolio /> */}
      {/* <About /> */}
    </div>
  );
}

export default App;
