import { Routes, Route } from "react-router-dom";
import Portfolio from './Screens/Portfolio';
import Blog from './Screens/Blog';
import Menu from './Components/Menu';
import Admin from './Screens/Admin';
import About from './Screens/About';

function App() {
  return (
    <div>
      <header>
        <Menu />
      </header>
      <Routes>
          <Route path="/" element={<Blog />}/>  
          <Route path="/portfolio" element={<Portfolio />}/>
          <Route path="/admin" element={<Admin />}/>
          <Route path="/about" element={<About />}/>
        </Routes>
    </div>
  );
}

export default App;
