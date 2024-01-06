import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Arrow from "./components/Arrow";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const variants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  return (
    <div className="fixed left-0 " ref={sidebarRef}>
      <motion.div
        className="flex items-center justify-between w-[5%] md:w-[30%] "
        onClick={() => setIsOpen(!isOpen)}
      >
        <Arrow />
      </motion.div>
      <motion.div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
        }} // Change the rgba values as needed
        className="overflow-auto w-screen md:w-full border bg-white transition rounded"
        variants={variants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.5 }}
      >
        {/* Sidebar content goes here */}
        <Link
          className="block px-8 py-4 m-0 md:text-left border-b-2 text-green-600 hover:text-white hover:bg-green-600 transition"
          onClick={() => {}}
        >
          Feeds
        </Link>
        <Link
          className="block px-8 py-4 m-0 md:text-left text-green-600 hover:text-white hover:bg-green-600 transition"
          onClick={() => {}}
        >
          Articles
        </Link>
      </motion.div>
    </div>
  );
};

export default Sidebar;
