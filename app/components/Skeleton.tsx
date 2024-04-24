import { motion } from "framer-motion";

export const Skeleton = ({ id }: any ) => {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0.5, backgroundPositionX: '-100%' }} // Initial opacity and background position
      animate={{ opacity: 1, backgroundPositionX: '200%' }} // Animation to full opacity and shimmer effect
      exit={{ opacity: 0.5 }} // When component unmounts, return to partial opacity
      transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }} // Animation duration and loop
      style={{
        width: '300px', // Set your desired width
        height: '30px', // Set your desired height
        backgroundColor: '#E0E0E0', // Set your desired background color
        borderRadius: '4px', // Set your desired border radius
        marginBottom: '10px', // Set your desired margin bottom
        background: 'linear-gradient(to right, #E0E0E0 0%, #F0F0F0 50%, #E0E0E0 100%)', // Shimmer effect gradient
        backgroundSize: '200% 100%', // Shimmer effect width
      }}
    />
  );
};