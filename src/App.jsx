import { Routes, Route } from "react-router-dom";

import RequireAuth from "./features/auth/RequireAuth";
import SingleContractorPage from "./components/SingleContractorPage";
import LoginPage from "./components/pages/LoginPage";
import ContractorsPage from "./components/pages/ContractorsPage";
import Overview from "./components/pages/Overview";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<RequireAuth />}>
          <Route path="overview" element={<Overview />} />
          <Route path="contractors" element={<ContractorsPage />} />
          <Route path="contractor/:id" element={<SingleContractorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
