const HeroSection = () => {
    const scrollMyConsumption = () => {
        const skillsSection = document.getElementById("my-consumption");
        if (skillsSection) {
            skillsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="dark:bg-black h-screen p-[5vh] flex flex-col">
            <div className="w-full h-[100%] rounded-lg overflow-hidden relative">
                <img 
                    src="https://res.cloudinary.com/dr0nki74e/image/upload/v1732200384/Global%20Solution%202/Start/u8k6kzellhg9cf1ueer0.jpg" 
                    alt="Image"
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-2 md:p-4">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold italic tracking-tight font-[Neue Haas Grotesk] whitespace-pre-line break-words">
                        <span className="text-gray-200">Clarke</span>
                        <span className="text-[#00e768]">Energia</span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-rounded font-bold italic">
                        Conheça nossos fornecedores disponíveis para você!
                    </p>

                    <button className="mt-4 px-6 py-2 bg-[#00e768] hover:bg-[#00cc58] text-white font-bold text-lg rounded-lg"
                    onClick={scrollMyConsumption}
                    >
                        Conhecer
                    </button>
                </div>
            </div>

        </div>
    );
};

export default HeroSection;