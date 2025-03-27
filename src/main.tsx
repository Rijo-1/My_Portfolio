import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import emailjs from '@emailjs/browser';

emailjs.init('-q7_tZpx4_ZsMEjf2');

createRoot(document.getElementById("root")!).render(<App />);
