import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from './components/List';
import Details from './components/Details';

export default function RouterPage(){
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<List />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </Router>
  )

}