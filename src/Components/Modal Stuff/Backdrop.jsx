import React from 'react'
import { motion } from "framer-motion";
import '../../MyCss/ModalStyles.css';
export default function Backdrop({ children, onClick }) {
    return (
        <motion.div
          onClick={onClick}
          className="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      );
}
