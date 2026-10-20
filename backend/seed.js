import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/Product.js';
dotenv.config();
const products = [
 {name:'Aero Runner Sneakers',slug:'aero-runner-sneakers',image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',description:'Lightweight everyday sneakers with a cushioned sole and a bold modern look.',brand:'Northline',category:'Footwear',price:2499,countInStock:12},
 {name:'Everyday Canvas Tote',slug:'everyday-canvas-tote',image:'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80',description:'A roomy tote for college, errands, and weekend plans.',brand:'Common Thread',category:'Accessories',price:899,countInStock:20},
 {name:'Minimal Dial Watch',slug:'minimal-dial-watch',image:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',description:'A minimalist watch design for everyday outfits.',brand:'Meridian',category:'Accessories',price:3199,countInStock:7},
 {name:'Studio Headphones',slug:'studio-headphones',image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',description:'Comfortable over-ear headphones for study and daily listening.',brand:'Soundform',category:'Electronics',price:4299,countInStock:9},
 {name:'Everyday Backpack',slug:'everyday-backpack',image:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',description:'A practical backpack for commuting, classes, and short trips.',brand:'Fieldwork',category:'Bags',price:1899,countInStock:14}
];
try {
 await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/custom_ecommerce');
 for (const p of products) await Product.updateOne({slug:p.slug},{$set:p},{upsert:true});
 console.log(`Seeded ${products.length} products.`);
} catch(e) { console.error(e.message); process.exitCode=1; }
finally { await mongoose.disconnect(); }
