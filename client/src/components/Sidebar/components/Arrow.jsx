import { motion } from "framer-motion";

const Arrow = () => {
  const variants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-20 w-20 md:h-10 md:w-10 cursor-pointer  "
      variants={variants}
      initial="closed"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
        className="text-2xl text-green-700"
      />
    </motion.svg>
  );
};

export default Arrow;
