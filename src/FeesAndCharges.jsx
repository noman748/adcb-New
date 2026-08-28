import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "./Header";


const FeesAndCharges = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const {phone} = location.state;

  return (
    <div className="min-h-screen bg-white px-4 pt-4 pb-6">
      <Header />

      <main className="p-4 md:p-8">
        <h2 className="text-lg font-semibold mb-4">Fees and Charges:</h2>

        <div className="overflow-x-auto border rounded-lg shadow">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left p-3 border-r w-1/3">Description</th>
                <th className="text-left p-3">Total Amount (with VAT)</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="border-b">
                <td className="p-3 border-r font-medium">Personal Loan 5000 OMR</td>
                <td className="p-3 text-wrap"> Your installment amount is 210 OMR, and there will be a total of 24 installments. You are required to pay one installment each month, bringing the total repayment amount to 5,040 OMR.</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 border-r font-medium">Business Loan 10000 OMR</td>
                <td className="p-3">Your installment amount is 285 OMR, and there will be a total of 36 installments. You are required to pay one installment each month, bringing the total repayment amount to 10,260 OMR.</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 border-r font-medium">Business Loan 20000 OMR</td>
                <td className="p-3">Your installment amount is 437 OMR, and there will be a total of 48 installments. You are required to pay one installment each month, bringing the total repayment amount to 20,976 OMR.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/form",{state: {phone}})}
            style={{ backgroundColor: "#D4253A" }}
            className="w-[200px] text-white font-semibold py-2 px-6 rounded-md shadow"
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  );
};

export default FeesAndCharges;
