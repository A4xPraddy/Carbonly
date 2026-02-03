import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Redirect from "./components/Redirect";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Redirect />} exact />
        <Route path="/auth/signin" element={<Auth signin={true} />} />
        <Route path="/auth/signup" element={<Auth signin={false} />} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Auth />} />
        </Route>
        <Route path="*" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
