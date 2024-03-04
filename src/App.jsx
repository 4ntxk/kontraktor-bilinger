import { Routes, Route } from "react-router-dom";

import Layout from "./components/ui/Layout";

import Login from "./components/Login";
import MainUserPage from "./components/MainUserPage";
import RequireAuth from "./features/auth/RequireAuth";
import SingleContractorPage from "./components/SingleContractorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path="mainuserpage" element={<MainUserPage />} />
          <Route path="contractor/:id" element={<SingleContractorPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
