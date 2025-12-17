
import { Product } from './types';

export interface ShoeProduct extends Product {
  id: string;
  modelUrl: string;
  modelScale: number;
  themeColor: string;
  textColor: string;
}

/**
 * Using the official Khronos Group sample model as it is the most stable and high-quality 
 * GLB asset available via raw github.
 */
const STABLE_SHOE_URL = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb';

export const PRODUCTS: ShoeProduct[] = [
  {
    id: 'jordan-visionaire',
    name: 'NIKE JORDAN SERIES',
    series: 'AIR JORDAN 1 HIGH',
    price: '$178.00',
    description: 'Past meets future with the Nike Air Max DNA. Brand-new cushioning adds unparalleled comfort to this iconic silhouette.',
    sizes: ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5'],
    modelUrl: STABLE_SHOE_URL,
    modelScale: 15,
    themeColor: '#d1fa48', 
    textColor: '#000000'
  },
  {
    id: 'jordan-retro',
    name: 'JORDAN 1 RETRO',
    series: 'COLLECTOR EDITION',
    price: '$190.00',
    description: 'A classic silhouette featuring premium materials and a unique variant-based design for the ultimate sneakerhead.',
    sizes: ['8', '9', '10', '11', '12'],
    modelUrl: STABLE_SHOE_URL,
    modelScale: 15,
    themeColor: '#38bdf8', 
    textColor: '#000000'
  },
  {
    id: 'jordan-stealth',
    name: 'JORDAN STEALTH',
    series: 'NIGHT OPS',
    price: '$180.00',
    description: 'Minimalist approach meets high-performance engineering. Soft grey leather and premium panels.',
    sizes: ['8', '8.5', '9', '10', '11'],
    modelUrl: STABLE_SHOE_URL,
    modelScale: 15,
    themeColor: '#cbd5e1', 
    textColor: '#000000'
  },
  {
    id: 'jordan-lava',
    name: 'JORDAN LAVA',
    series: 'VOLCANIC EDITION',
    price: '$210.00',
    description: 'Explosive colors and raw edges. This design is inspired by the raw power of volcanic landscapes.',
    sizes: ['7', '8', '9', '10', '11', '12'],
    modelUrl: STABLE_SHOE_URL,
    modelScale: 15,
    themeColor: '#f87171', 
    textColor: '#000000'
  }
];

export const COLORS = PRODUCTS.map(p => ({
  id: p.id,
  hex: p.themeColor
}));
