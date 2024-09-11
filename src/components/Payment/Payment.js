import React from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();

  const handlePaymentClick = () => {
    navigate("/pay-now");
  };

  return (
    <div className="pt-24 width:100% bg-sky-50 pb-20">
      <h1 class="mb-4 text-6xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-center px-8">
        Payment <span className="text-indigo-950">GateWay.</span>
      </h1>
      
      

      <span className="block border-t-2 border-solid border-slate-600 w-3/4 mt-4 mx-auto mb-8"></span>

      <div className="flex flex-wrap justify-around">

        <div className="mx-8 mb-4 xl:w-2/4 lg:w-screen">
          <h1 className="text-6xl font-bold text-slate-600 mb-1">Pay Using</h1>
          <h1 className="text-6xl font-bold mb-1">
            <span className="text-indigo-950">Escrow</span> 
          </h1>
          <p className="text-3xl text-slate-900 mb-2">
          Secure your transactions with our escrow service: funds are held safely until both parties fulfill their obligations, ensuring peace of mind for freelancers and employers alike.
          </p>
        
            
        </div>
        <div className="grow bg-gray-100 shadow-lg rounded-lg mx-8 text-left p-4">
          <h3 className="text-4xl font-bold">Proceed to secure payment</h3>
         

          <form action="">
            <label htmlFor="name" className="block text-base font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              // value={profileDetails.postalCode}
              // onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Your Name"
            />

            <label htmlFor="mail" className="block text-base font-medium mt-2">
              Email
            </label>
            <input
              type="email"
              id="mail"
              name="mail"
              required
              // value={profileDetails.postalCode}
              // onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Your Email"
            />

            <label htmlFor="amout" className="block text-base font-medium mt-2">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              required
              // value={profileDetails.postalCode}
              // onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Your Donation Amount"
            />

            <label
              htmlFor="method"
              className="block text-base font-medium mt-2"
            >
              Payment Method
            </label>
            <input
              list="methods"
              id="method"
              name="method"
              required
              // value={profileDetails.postalCode}
              // onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Select Payment Method"
            />
            <datalist id="methods">
              <option>Credit Card</option> <option>Debit Card</option>
              <option>Net Banking</option>
              <option>UPI</option>
            </datalist>

            <button
              onClick={handlePaymentClick}
              className="block px-3 py-1 mx-auto mt-4 text-white bg-gradient-to-r  from-sky-600 to-blue-700  font-medium rounded-full hover:scale-105 transition-all duration-500 ease-in-out"
            >
              Payment Now!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;