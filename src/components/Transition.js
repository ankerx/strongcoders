import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
const swipeAnimations = {
  initial: { x: -250 },
  animate: { x: 0 },
  exit: { x: 120 },
};
export const Transition = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export const SwipeTransition = ({ children }) => {
  return (
    <motion.div
      variants={swipeAnimations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, x: { type: "spring", stiffness: 90 } }}
    >
      {children}
    </motion.div>
  );
};
