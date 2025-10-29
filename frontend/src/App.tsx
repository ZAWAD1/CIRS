import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoleSelect from "./pages/RoleSelect";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/roles" element={<RoleSelect />} />
    </Routes>
  );
}

export default App;
