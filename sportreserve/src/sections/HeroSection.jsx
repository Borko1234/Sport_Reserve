import heroImage from "../assets/Hero.jpg";

function HeroSection() {
    return (
        <section className="relative w-full h-[600px] flex items-center justify-start text-white text-center"
            style={{ backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 max-w-screen-xl px-6 text-left">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Добре дошли в SportReserve
                </h1>
                <p className="mt-3 text-2xl">
                    Твоето място за спорт – резервирай, създавай, играй!
                </p>
                <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded text-2xl font-normal hover:cursor-pointer hover:bg-orange-600 transition">
                    Създай събитие
                </button>
            </div>
        </section>
    );
}

export default HeroSection