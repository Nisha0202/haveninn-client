import React from 'react'
import { Helmet } from 'react-helmet'

export default function Contact() {
  return (
   
 <div className="container  p-8">
           <Helmet>
        <title>HavenInn - Contact</title>
      </Helmet>
      <div className='p-5'>
  <h1 className="text-xl font-bold text-center mb-6 px-4">Contact Us</h1>
            <div className="max-w-md mx-auto">
                <form className="flex flex-col gap-4">
                    <input type="text" placeholder="Your Name" className="input input-bordered" />
                    <input type="email" placeholder="Your Email" className="input input-bordered" />
                    <textarea placeholder="Your Message" className="textarea textarea-bordered h-24"></textarea>
                    <button type="submit" className="btn bg-cyan-600 text-white">Send Message</button>
                </form>
            </div>
      </div>
          
        </div>

  )
}

