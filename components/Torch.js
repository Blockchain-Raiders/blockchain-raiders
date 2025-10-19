import { motion } from 'framer-motion';

export default function Torch({ className='' }) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full"
        animate={{ opacity:[0.8,1,0.8], scale:[1,1.08,1] }}
        transition={{ duration:1.1, repeat:Infinity, ease:'easeInOut' }}
        style={{ background:'radial-gradient(circle, rgba(255,190,90,0.95) 0%, rgba(255,120,40,0.6) 60%, rgba(0,0,0,0) 70%)', filter:'blur(1px)' }}
      />
      <div className="w-2 h-8 bg-[#6b3a1a] mx-auto rounded-sm" />
    </div>
  );
}
