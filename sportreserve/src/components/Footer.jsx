import { Instagram, Facebook, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-black text-white py-6">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-5">
                    <input 
                        type="email" 
                        placeholder="Твоят имейл" 
                        className="bg-transparent border-b border-gray-400 outline-none text-white placeholder-gray-500 px-2 py-1"
                    />
                    <button className="border border-white px-3 py-1 rounded-xl hover:bg-white hover:text-black transition hover:cursor-pointer">
                        Абонирай се
                    </button>
                </div>
                
                <nav className="flex space-x-10 text-xl mt-4 md:mt-0">
                    <a href="#" className="hover:text-gray-400 transition">За нас</a>
                    <a href="#" className="hover:text-gray-400 transition">Контакти</a>
                    <a href="#" className="hover:text-gray-400 transition">Новини</a>
                </nav>

                <div className="flex space-x-8 mt-4 md:mt-0">
                    <a href="#" className="hover:text-gray-400 transition"><Instagram size={30} /></a>
                    <a href="#" className="hover:text-gray-400 transition"><Facebook size={30} /></a>
                    <a href="#" className="hover:text-gray-400 transition"><FaTiktok size={30} /></a>
                    <a href="#" className="hover:text-gray-400 transition"><Youtube size={38} /></a>
                </div>
            </div>
        </footer>
    );
}
