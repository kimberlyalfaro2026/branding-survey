import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Survey from './components/Survey';
import Admin from './components/Admin';
import Results from './components/Results';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/survey/:surveyId" element={<Survey />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/results/:surveyId" element={<Results />} />
        <Route path="/" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
