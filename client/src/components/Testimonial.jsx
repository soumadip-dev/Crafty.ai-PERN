import React from 'react';
import { DummyTestimonialData } from '../assets/assets';

const Testimonial = () => {
  const [activeCard, setActiveCard] = React.useState(null);
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-10 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">What Our Users Say</h2>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Trusted by thousands of creators, marketers and entrepreneurs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DummyTestimonialData.map((testimonial, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              className="relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <svg
                    className="w-12 h-12 bg-gradient-to-r from-red-500 to-green-500 text-white p-2 rounded-full"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 ml-4">{testimonial.name}</h3>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.message}"</p>

                <div className="flex items-center">
                  <img
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                    src={testimonial.image}
                    alt={`${testimonial.name} profile`}
                  />
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>

                <div
                  className={`absolute top-0 right-0 mt-6 mr-6 text-5xl font-serif italic text-gray-200 ${
                    activeCard === index ? 'opacity-100' : 'opacity-30'
                  } transition-opacity duration-300`}
                >
                  "
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
