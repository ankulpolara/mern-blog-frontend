// src/components/About.js
import React from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import founder from "../assets/founder.jpeg";
export const About = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Main Container */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="text-4xl font-bold mb-4">About Polara's Blog</h1>
        <motion.p
          className="text-lg mb-4"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Welcome to Polara's Blog, a place where we share insightful articles
          on a variety of topics, ranging from technology and lifestyle to
          personal development. Our goal is to provide valuable content that
          inspires and informs our readers.
        </motion.p>
        <motion.img
          src="https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600" // Replace with your image URL
          alt="About Us"
          className="mx-auto rounded-lg mb-4"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <motion.p
          className="text-lg mx-auto max-w-2xl"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          At Polara's Blog, our mission is to create a platform where readers
          can find meaningful and engaging content. We strive to offer
          high-quality articles that resonate with our audience and provide
          valuable insights into various subjects.
        </motion.p>
      </motion.div>

      {/* History */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-3xl font-semibold mb-4">Our History</h2>
        <motion.p
          className="text-lg mx-auto max-w-2xl"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Polara's Blog was founded in 2023 with the aim of providing a unique
          space for thoughtful articles and discussions. Over the years, we have
          grown to become a trusted source of information and inspiration for
          our readers.
        </motion.p>
      </motion.div>

      {/* Team Section */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-3xl font-semibold mb-4">Meet the Founder</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.div
            className="w-48 p-4 border rounded-lg shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <img
              src={founder} // Replace with your image URL
              alt="Team Member"
              className="w-[100%] h-36 object-cover rounded-full mb-2 mx-auto -pt-4   px-auto"
            />
            <h3 className="text-xl font-medium">Polara Ankul</h3>
            <p className="text-gray-600">chief Executive officer</p>
          </motion.div>

          {/* <motion.div
            className="w-48 p-4 border rounded-lg shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <img
              src="https://via.placeholder.com/150" // Replace with your image URL
              alt="Team Member"
              className="w-full h-32 object-cover rounded-full mb-2"
            />
            <h3 className="text-xl font-medium">Jane Smith</h3>
            <p className="text-gray-600">Writer</p>
          </motion.div> */}
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
        <motion.p
          className="text-lg mx-auto max-w-2xl mb-4"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          If you have any questions or feedback, feel free to reach out to us
          at:
        </motion.p>
        <motion.a
          href="ankulpolara2004@gmail.com"
          className="text-blue-500 underline"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          ankulpolara2004@gmail.com
        </motion.a>
      </motion.div>
      <Footer />
    </div>
  );
};
