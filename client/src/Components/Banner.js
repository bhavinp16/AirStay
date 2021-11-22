function Banner() {
    return (
        <div className="container ">
            <div className="" style={{ position: "relative" }}>
                <img src="/images/bannermain.jfif" alt="#"
                    className="img-fluid shadow-inner"
                    style={{
                        width: '100%',
                        height: '681px',
                        border: '1px solid black',
                        borderRadius: '30px',
                    }} />
                {/* place on top of image */}
                <div className="flex-row" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <p className="text-white font-sans text-4xl font-semibold">Not sure where to go? Perfect.</p>
                    <br />
                    <button className="bg-white text-transparent shadow-md border-transparent border rounded-full px-5 py-2 my-1 transition delay-75 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 ">
                        <p className="animate-pulse text-md ">I'm flexible</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Banner
