
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Share2 } from 'lucide-react';
import { Header } from './components/Header';
import { FloatingShoe } from './components/FloatingShoe';
import { PRODUCTS } from './constants';

const App: React.FC = () => {
  const [index, setIndex] = useState(0);
  const currentProduct = PRODUCTS[index];
  const [selectedSize, setSelectedSize] = useState<string>('9');

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 transition-colors duration-1000 ease-in-out font-sans overflow-hidden"
      style={{ backgroundColor: `${currentProduct.themeColor}15` }}
    >
      <motion.div 
        layout
        className="w-full max-w-[1440px] h-[85vh] rounded-[4rem] relative overflow-hidden flex flex-col shadow-[0_80px_160px_rgba(0,0,0,0.25)]"
        style={{ backgroundColor: currentProduct.themeColor }}
      >
        <Header />

        <div className="flex-1 flex relative px-12 md:px-24 items-center">
          
          <motion.div 
            key={`info-${currentProduct.id}`}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="w-full md:w-2/5 z-20 space-y-12"
          >
            <motion.div variants={itemVariants}>
              <span className="text-[11px] font-black tracking-[0.5em] uppercase opacity-50 block mb-6">Ultra-Modern 3D</span>
              <h2 className="text-6xl md:text-8xl font-[1000] tracking-tighter leading-[0.85] mb-6 uppercase italic">
                {currentProduct.name.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h2>
              <div className="flex items-center space-x-8">
                 <p className="text-5xl font-black">{currentProduct.price}</p>
                 <div className="h-px w-12 bg-black opacity-20"></div>
                 <span className="text-[12px] font-bold opacity-60">EXCLUSIVE ACCESS</span>
              </div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-[15px] leading-relaxed max-w-[380px] font-medium opacity-70">
              {currentProduct.description}
            </motion.p>

            <motion.div variants={itemVariants} className="flex space-x-6">
              <button className="px-10 py-5 bg-black text-white rounded-2xl font-black text-[12px] tracking-widest uppercase hover:scale-105 transition-all shadow-xl">
                Purchase Now
              </button>
              <button className="w-16 h-16 rounded-2xl border-2 border-black/10 flex items-center justify-center hover:bg-black/5 transition-all">
                <Share2 size={20} />
              </button>
            </motion.div>
          </motion.div>

          {/* Dinamik 3D Sahne */}
          <div className="absolute inset-0 z-10 pointer-events-none lg:pointer-events-auto">
            <AnimatePresence mode="wait">
               <FloatingShoe 
                 key={currentProduct.id} 
                 modelUrl={currentProduct.modelUrl} 
                 themeColor={currentProduct.themeColor} 
                 scale={currentProduct.modelScale}
               />
            </AnimatePresence>
          </div>

          <motion.div 
            key={`controls-${currentProduct.id}`}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="hidden lg:flex w-1/4 ml-auto z-20 flex-col items-end text-right space-y-20"
          >
            <motion.div variants={itemVariants} className="w-full max-w-[280px]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-[11px] font-black tracking-widest uppercase opacity-60">Select Size</h3>
                <span className="text-[10px] font-bold border-b border-black/20 pb-0.5 opacity-40 cursor-pointer">Guide</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {currentProduct.sizes.slice(0, 8).map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 text-[12px] font-black rounded-xl border transition-all duration-500 ${
                      selectedSize === size 
                      ? 'bg-black text-white border-black shadow-xl scale-110' 
                      : 'border-black/5 hover:border-black/20 bg-black/5'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full max-w-[280px]">
              <h3 className="text-[11px] font-black tracking-widest uppercase opacity-60 mb-8 text-left">Switch Model</h3>
              <div className="flex space-x-5">
                {PRODUCTS.map((prod, i) => (
                  <button
                    key={prod.id}
                    onClick={() => setIndex(i)}
                    className={`group relative w-14 h-14 rounded-2xl transition-all duration-500 overflow-hidden ${
                      index === i ? 'scale-125 shadow-2xl z-10 border-2 border-white' : 'opacity-40 hover:opacity-100 hover:scale-110'
                    }`}
                    style={{ backgroundColor: prod.themeColor }}
                  >
                    {index === i && (
                      <motion.div 
                        layoutId="active-ring" 
                        className="absolute inset-0 border-4 border-black/10 pointer-events-none" 
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-24 flex items-center space-x-12 z-30"
        >
          <div className="flex -space-x-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-4 border-white/20 bg-black/20 overflow-hidden backdrop-blur-md">
                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-bold">+12k</div>
          </div>
          <p className="text-[10px] font-bold tracking-widest uppercase opacity-40">Viewing this collection</p>
        </motion.div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          className="absolute bottom-10 right-24 flex items-center space-x-4 group z-30"
        >
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black tracking-widest uppercase opacity-40">Next Story</span>
            <span className="text-[12px] font-black tracking-widest uppercase">The Heritage</span>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-black/10 flex items-center justify-center border border-black/10 group-hover:bg-black group-hover:text-white transition-all shadow-lg">
            <Play size={18} fill="currentColor" />
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default App;
