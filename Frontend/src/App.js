import "./index.css"
import { Outlet } from "react-router-dom";
const App = ()=>{
  return (
    <div class="app">
      <Outlet/>
    </div>
  )
}

export default App; 