import { MailIcon } from 'lucide-react';

const RegisterInfoMessage = () => {
  return (
    <div className="max-w-2xl mx-auto mt-28 mb-28 bg-blue-50 border border-blue-200 rounded-2xl shadow p-6 text-center">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Want to Register as an Agent or Agency?</h2>
      <p className="text-md text-gray-700 mb-2">
        Please contact our backend team.
        </p>
        <p className="text-md text-gray-700 mb-2">
            Click here 
        <a
          href="mailto:cybersecops851@gmail.com"
          className="text-blue-600 font-semibold underline mx-1"
        >
          cybersecops851@gmail.com
        </a>
        to get all the necessary details & start the registration process.
      </p>
      <p className="text-md mt-4 text-gray-700">
        Registration typically takes <span className="font-medium">3-5 business days</span>. 
      </p>
      <span className='text-md text-gray-700'>Our team will reach out to you shortly. <MailIcon className=" inline h-5 w-5 text-blue-500" /></span>
      <div className="flex justify-center mt-4">
        
      </div>
    </div>
  );
};

export default RegisterInfoMessage;
