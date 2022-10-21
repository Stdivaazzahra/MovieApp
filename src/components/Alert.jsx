import React from 'react';
import { motion } from 'framer-motion';
const Alert = () => {
  return (
    <motion.div className="text-white bg-red-500/90 p-4 fixed z-[1000] left-0 right-0 " initial={{ y: '-100vh' }} animate={{ y: '0vh' }} transition={{ duration: 0.5 }} exit={{ y: '-100vh' }}>
      Login First to access any feature !
    </motion.div>
  );
};

export default Alert;
