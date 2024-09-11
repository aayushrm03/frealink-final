import React from 'react'
import saumya from '../../assets/saumya.jpeg';
import aayushi from '../../assets/aayushi.jpeg';
import akshit from '../../assets/akshit.jpeg';
import ishaan from'../../assets/ishaan.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import aryan from '../../assets/aryan.jpeg';
import himansh from '../../assets/himansh.jpeg';

function OurTeam() {
  return (
    <div className='pt-20 text-center pb-24 bg-slate-100'>
      <h3 className='text-5xl font-bold mb-6'>
        <span className='text-indigo-950'>Meet</span> <span className='text-slate-600'>Our</span> Team
      </h3>
      <p className='text-xl m-6'>
        Our team consists of driven professionals with a shared commitment to fostering positive change in our communities. 
        Each member brings a wealth of experience and a deep understanding of the nonprofit sector, ensuring that we facilitate impactful and lasting partnerships. Together, we strive to empower freelancers and support organizations in making a difference.
      </p>

 
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-6'>

  
        <div className='p-6 bg-white rounded-lg shadow-md border border-gray-200 text-center hover:scale-105 hover:shadow-custom-kaala transition-all duration-1000 ease-in-out'>
          <div 
            style={{
              backgroundImage: `url(${ishaan})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "50%"
            }}
            className='h-48 w-48 mx-auto mb-4'
          ></div>
          <h3 className='text-2xl font-medium'>Ishaan Rawat</h3>
          <h5 className='text-xl text-slate-600'>Project Lead</h5>
          <p className='text-xl'>
            <a href="https://www.linkedin.com/in/ishaan-rawat-a88946267">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </p>
        </div>
        <div className='p-6 bg-white rounded-lg shadow-md border border-gray-200 text-center hover:scale-105 hover:shadow-custom-kaala transition-all duration-1000 ease-in-out'>
          <div 
            style={{
              backgroundImage: `url(${aayushi})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "50%"
            }}
            className='h-48 w-48 mx-auto mb-4'
          ></div>
          <h3 className='text-2xl font-medium'>Aayushi Sharma</h3>
          <h5 className='text-xl text-slate-600'>Developer</h5>
          <p className='text-xl'>
            <a href="https://www.linkedin.com/in/aayushi-sharma-8ab2942b7/">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </p>
        </div>

  
        <div className='p-6 bg-white rounded-lg shadow-md border border-gray-200 text-center hover:scale-105 hover:shadow-custom-kaala transition-all duration-1000 ease-in-out'>
          <div 
            style={{
              backgroundImage: `url(${saumya})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "50%"
            }}
            className='h-48 w-48 mx-auto mb-4'
          ></div>
          <h3 className='text-2xl font-medium'>Saumya Jhamb</h3>
          <h5 className='text-xl text-slate-600'>Developer</h5>
          <p className='text-xl'>
            <a href="www.linkedin.com/in/saumya-jhamb-22b32824b">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </p>
        </div>

    
        <div className='p-6 bg-white rounded-lg shadow-md border border-gray-200 text-center hover:scale-105 hover:shadow-custom-kaala transition-all duration-1000 ease-in-out'>
          <div 
            style={{
              backgroundImage: `url(${aryan})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "50%"
            }}
            className='h-48 w-48 mx-auto mb-4'
          ></div>
          <h3 className='text-2xl font-medium'>Aryan Chauhan</h3>
          <h5 className='text-xl text-slate-600'>Developer</h5>
          <p className='text-xl'>
            <a href="ttps://www.linkedin.com/in/aryan-chauhan-583949281">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </p>
        </div>

        <div className='p-6 bg-white rounded-lg shadow-md border border-gray-200 text-center hover:scale-105 hover:shadow-custom-kaala transition-all duration-1000 ease-in-out'>
          <div 
            style={{
              backgroundImage: `url(${akshit})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "50%"
            }}
            className='h-48 w-48 mx-auto mb-4'
          ></div>
          <h3 className='text-2xl font-medium'>Akshit Manan</h3>
          <h5 className='text-xl text-slate-600'>Developer</h5>
          <p className='text-xl'>
            <a href="https://www.linkedin.com/in/akshit-manan-bb5a5a256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </p>
        </div>

      
        <div className='p-6 bg-white rounded-lg shadow-md border border-gray-200 text-center hover:scale-105 hover:shadow-custom-kaala transition-all duration-1000 ease-in-out'>
          <div 
            style={{
              backgroundImage: `url(${himansh})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "50%"
            }}
            className='h-48 w-48 mx-auto mb-4'
          ></div>
          <h3 className='text-2xl font-medium'>Himansh Harbola</h3>
          <h5 className='text-xl text-slate-600'>UI/UX</h5>
          <p className='text-xl'>
            <a href="https://www.linkedin.com/in/himansh-harbola-575b77273?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}

export default OurTeam;
