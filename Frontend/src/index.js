import ReactDOM from 'react-dom/client';
import App from './App';
import React from 'react';
import {RouterProvider,createBrowserRouter} from "react-router-dom"
import HomePage from "./Components/HomePage.js"
import Error from './Components/Error.js';
import Signin from "./Components/Signin.js";
import HopeHouse from './Components/HopeHouse';
import Ecell from './Components/Ecell.js';
import CodeClub from './Components/CodeClub.js';
import TNP from './Components/TNP.js';
import MathClub from './Components/MathClub.js';
import DeptClub from './Components/DeptClub.js';
import AddEvent from "./Components/AddEvent.js";
import EventDetails from './Components/EventDetails.js';
import DeleteEvent from './Components/DeleteEvent.js';
import AddMember from './Components/AddMember.js';
import Profile from './Components/Profile.js';


const AppRouter = createBrowserRouter(
  [
    {
       path:"/",
       element:<App/>,
       children:[
            {
              path:"/",
              element:<HomePage/>,
              errorElement:<Error/>
            },
            {
              path: "signin",
              element: <Signin/>,
              errorElement: <Error/>
            },
            {
              path: "hopehouse",
              element: <HopeHouse/>,
              errorElement: <Error/>
            },
            {
              path:"ecell",
              element: <Ecell/>,
              errorElement: <Error/>
            },
            {
              path:"codeclub",
              element: <CodeClub/>,
              errorElement: <Error/>,
            },
            {
              path:"mathclub",
              element: <MathClub/>,
              errorElement: <Error/>,
            },
            {
              path:"tnp",
              element: <TNP/>,
              errorElement: <Error/>,
            },
            {
              path:"deptclub",
              element: <DeptClub/>,
              errorElement: <Error/>,
            },
            {
              path:"addevent",
              element:<AddEvent/>,
              errorElement: <Error/>
            },
            {
              path:"eventdetails",
              element: <EventDetails/>,
              errorElement: <Error />
            },
            {
              path:"deleteevent",
              element:<DeleteEvent/>,
              errorElement:<Error/>
            },
            {
              path:"addmember",
              element: <AddMember />,
              errorElement:<Error/>
            },
            {
              path:"profile",
              element:<Profile/>,
              errorElement:<Error/>
            },
       ]

    }
  ]
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router = {AppRouter} />);