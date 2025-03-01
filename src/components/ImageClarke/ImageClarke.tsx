const ImageClarke = () => {
    return (
        <div className="dark:bg-black min-h-screen flex flex-col">
            <div className="w-full min-h-screen overflow-hidden relative">
                <img 
                    src="/images/image-login.jpg"
                    alt="Image"
                    className="w-full min-h-screen object-cover"
                />

                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-end text-white text-center p-2 md:p-4">
                    <h1 className="text-3xl font-extrabold italic tracking-tight font-[Neue Haas Grotesk] whitespace-pre-line break-words">
                        <span className="text-gray-200">Clarke</span>
                        <span className="text-[#00e768]">Energia</span>
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default ImageClarke;
