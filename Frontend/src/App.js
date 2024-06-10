import HomePage from "./Components/HomePage";
import Ecell from "./Components/Ecell"
import DeptClub from "./Components/DeptClub"
import Signin from "./Components/Signin"
import Signup from "./Components/Signup"
import AddAdmin from "./Components/AddAdmin"
import EventDetails from "./Components/EventDetails"
import AddMember from "./Components/AddMember"
import AddEvent from "./Components/AddEvent";
import Profile from "./Components/Profile"
import DeleteEvent from "./Components/DeleteEvent"
import "./index.css"
import "./Components/HomePage.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/authorization/ProtectedRoute";

const App = ()=>{
  return (
    <div className="app">
      
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/club" element={<ProtectedRoute><Ecell /></ProtectedRoute>} />
            <Route path="/deptclub" element={<DeptClub/>} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/addadmin" element={<AddAdmin/>} />
            <Route path="/eventdetails" element={<EventDetails/>} />
            <Route path="/addmember" element={<AddMember/>} />
            <Route path="/addevent" element={<AddEvent/>} />
            <Route path="/deleteevent" element={<DeleteEvent/>} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App; 