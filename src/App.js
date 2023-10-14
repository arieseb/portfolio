import { Routes, Route } from "react-router-dom";
import Portfolio from './Screens/Portfolio';
import Blog from './Screens/Blog';
import Menu from './Components/Menu';
import Admin from './Screens/Admin';

function App() {
  return (
    <div>
      <header>
        <Menu />
      </header>
      <Routes>
          <Route path="/" element={<Portfolio />}/>
          <Route path="/blog" element={<Blog />}/>
          <Route path="/admin" element={<Admin />}/>
        </Routes>
    </div>
  );
}

export default App;
