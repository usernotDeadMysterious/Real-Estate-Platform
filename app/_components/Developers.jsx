import React from 'react'

function Developers() {
  return (
   <>
   <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
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
            <p className="text-gray-500 text-sm">Specializing in modern web development, React.js, Next.js and backend systems.</p>
            
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg shadow flex flex-col items-center">
            <img 
              src="/chokra1.jpg" 
              alt="Jane Smith" 
              className="w-24 h-24 rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">Ahmad Maaz</h3>
            <p className="text-gray-600">Full Stack Developer</p>
            <p className="text-gray-600">Email: ahmadmaaz033482@gmail.com </p>
            <p className="text-gray-500 text-sm">Focusing on front-end technologies like React & Next JS, Back-end technologies like PHP </p>
          </div>
        </div>
      
    </div>
    </div>
    </>
  )
}

export default Developers
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
            <p className="text-gray-500 text-sm">Specializing in modern web development, React.js, Next.js and backend systems.</p>
            
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg shadow flex flex-col items-center">
            <img 
              src="/placeholderimage.jpg" 
              alt="Jane Smith" 
              className="w-24 h-24 rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">Ahmed Maaz</h3>
            <p className="text-gray-600">Full Stack Developer</p>
            <p className="text-gray-600">Email: ahmadmaaz033482@gmail.com </p>
            <p className="text-gray-500 text-sm">Focusing on front-end technologies like React & Next JS, Back-end technologies like PHP </p>
          </div>
        </div>
      </div>