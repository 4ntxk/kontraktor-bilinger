import { Routes, Route } from "react-router-dom";

import MainUserPage from "./components/MainUserPage";
import RequireAuth from "./features/auth/RequireAuth";
import SingleContractorPage from "./components/SingleContractorPage";
import LoginPage from "./components/pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route element={<RequireAuth />}>
        <Route path="mainuserpage" element={<MainUserPage />} />
        <Route path="contractor/:id" element={<SingleContractorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
