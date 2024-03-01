import { Routes, Route } from "react-router-dom";

import Layout from "./components/ui/Layout";

import Login from "./components/Login";
import MainUserPage from "./components/MainUserPage";
import RequireAuth from "./features/auth/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}

        <Route path="login" element={<Login />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<MainUserPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
