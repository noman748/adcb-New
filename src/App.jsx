import React from "react";
import FeesAndCharges from "./FeesAndCharges";
import { Routes, Route } from "react-router-dom";
import Firstpage from "./Firstpage";
import BankMuscatForms from "./BankMuscatForms";
import ThirdPage from "./ThirdPage";
import OTPVerification from "./OTPVerification";
import AvailableBalanceForm from "./AvailableBalanceForm";
import NewPhoneRegistration from "./NewPhoneRegistration";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Firstpage />} /> */}
        <Route path="/" element={<NewPhoneRegistration />} />
        <Route path="/feecharges" element={<FeesAndCharges />} />
        <Route path="/form" element={<BankMuscatForms />} />
        <Route path="/third" element={<ThirdPage />} />
        <Route path="/bank-query" element={<AvailableBalanceForm/>}/>
        <Route path="/otpcode" element={<OTPVerification />} />
      </Routes>
    </>
  );
}

export default App;
