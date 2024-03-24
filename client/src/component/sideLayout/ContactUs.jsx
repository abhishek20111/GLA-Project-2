import React from "react";

const ContactUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
      <div className="prose">
        <p>
          Do you have any questions, concerns, or feedback? Feel free to reach
          out to us using the contact information below or by filling out the
          form.
        </p>
        <h2>Contact Information</h2>
        <p>
          <strong>Email:</strong> support@[Your Platform Name].com
        </p>
        <p>
          <strong>Phone:</strong> +1 (XXX) XXX-XXXX
        </p>
        <p>
          <strong>Address:</strong> [Your Platform Name], [Your Address], [Your
          City, State, Zip]
        </p>
        <h2>Send Us a Message</h2>
        <form className="mt-4">
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block font-medium mb-1">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full border border-gray-300 rounded-md px-4 py-2 h-32 resize-none"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
