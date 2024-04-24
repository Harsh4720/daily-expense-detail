import "./Sidebar.css"
import { NavLink } from "react-router-dom"

function Sidebar() {
  return (
    <div>
      <div className="sidebar">
      <ul>
        <li><NavLink className="link" to="./form">Add</NavLink></li>
        <li><NavLink className="link" to="./details">Show Details</NavLink></li>
        <li><NavLink className="link" to="./filter">Filter</NavLink></li>
      </ul>
    </div>
    </div>
  )
}

export default Sidebar
