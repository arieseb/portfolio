import './App.css';
import { Routes, Route } from "react-router-dom";
import Portfolio from './Screens/Portfolio';
import Blog from './Screens/Blog';
import Menu from './Components/Menu';

function App() {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Portfolio/>}/>
        <Route path="/blog" element={<Blog/>}/>
      </Routes>
    </div>
  );
}

export default App;
