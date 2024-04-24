import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Form from './components/AddDetails/form';
import ShowDetails from './components/ShowDetails/details';
import Filter from './components/Filter/filter';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Sidebar />
          <Routes>
            <Route exact path='/' element={<Form />} />
            <Route path='/form' element={<Form />} />
            <Route path='/details' element={<ShowDetails />} />
            <Route path='/filter' element={<Filter />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
