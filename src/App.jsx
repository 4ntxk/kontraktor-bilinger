import { Routes, Route } from "react-router-dom";

import RequireAuth from "./features/auth/RequireAuth";
import SingleContractorPage from "./components/SingleContractorPage";
import LoginPage from "./components/pages/LoginPage";
import ContractorsPage from "./components/pages/ContractorsPage";
import Overview from "./components/pages/Overview";
import { Toaster } from "./components/ui/toaster";
import ContractorForm from "./components/ui/ContractorForm";
import BillingPage from "./components/pages/BillingPage";
import BillingForm from "./components/pages/BillingForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<RequireAuth />}>
          <Route path="overview" element={<Overview />} />
          <Route path="contractors" element={<ContractorsPage />} />
          <Route path="contractor/:id" element={<SingleContractorPage />} />
          <Route path="addcontractor" element={<ContractorForm />} />
          <Route path="addbilling" element={<BillingForm />} />
          <Route path="billings" element={<BillingPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
