
export interface ColorVariant {
  id: string;
  name: string;
  bgClass: string;
  primaryHex: string;
  secondaryHex: string;
  accentHex: string;
  shoeUrl: string;
}

export interface Product {
  name: string;
  series: string;
  price: string;
  description: string;
  sizes: string[];
}
