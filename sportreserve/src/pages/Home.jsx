import HeroSection from "../sections/HeroSection";
import EventsSection from "../sections/EventsSection";

function Home() {
    return (
        <div className="flex flex-col items-center">
            <HeroSection />
            <h1 className="max-w-4xl text-center mx-auto py-10 text-4xl font-light">
                SportReserve ти помага лесно да организираш и откриваш спортни събития, 
                да резервираш зали и игрища и да се включваш в активности с други спортисти.
            </h1>
            <EventsSection/>
        </div>
    );
}

export default Home;
