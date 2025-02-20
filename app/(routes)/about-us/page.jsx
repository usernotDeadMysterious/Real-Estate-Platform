import React from 'react'

function page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600 text-lg mb-6">
          Welcome to our real estate platform, your trusted partner in finding the perfect home. 
          We are dedicated to providing you with the best property listings, advanced search capabilities, 
          and seamless user experience to make your home-buying or renting journey easier.
        </p>
        <p className="text-gray-600 text-lg mb-6">
          Our team of experienced professionals is committed to ensuring that you have access to accurate 
          and up-to-date real estate information. Whether you're looking to buy, sell, or rent, 
          we are here to assist you every step of the way.
        </p>
        <p className="text-gray-600 text-lg">
          Thank you for choosing us as your real estate partner. Let's find your dream property together!
        </p>
      </div>
      
      {/* Developers Section */}
      <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8 text-center mt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet the Developers</h2>
        <p className="text-gray-600 text-lg mb-6">
          Our development team is passionate about building user-friendly and efficient solutions. 
          Stay tuned as we add more details about the amazing minds behind this platform.
        </p>
        <div className="grid grid-cols-1  gap-6">
          {/* Developer 1 */}
          <div className="bg-gray-50 p-4 rounded-lg shadow flex flex-col items-center">
            <img 
              src="/mypic.png" 
              alt="John Doe" 
              className="w-24 h-24 rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">Aizaz Khalid</h3>
            <p className="text-gray-600">Full-Stack Developer</p>
            <p className="text-gray-600 ">Email: aizazkhalid852@gmail.com</p>
            <p className="text-gray-500 text-sm">Specializing in modern web development, React.js, and backend systems.</p>
            
          </div>
          {/* Developer 2
          <div className="bg-gray-50 p-4 rounded-lg shadow flex flex-col items-center">
            <img 
              src="https://via.placeholder.com/100" 
              alt="Jane Smith" 
              className="w-24 h-24 rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">Jane Smith</h3>
            <p className="text-gray-600">UI/UX Designer</p>
            <p className="text-gray-500 text-sm">Focusing on intuitive designs and seamless user experiences.</p>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default page
