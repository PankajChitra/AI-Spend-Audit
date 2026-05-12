import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Audit from "./pages/Audit";
import Report from "./pages/Report";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/report/:id" element={<Report />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;