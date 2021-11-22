function Banner() {
    return (
        <div className="container">
            <div className="" style={{ position: "relative" }}>
                <img src="/images/bannermain.jfif" alt="#"
                    className="img-fluid shadow-inner"
                    style={{
                        padding: "30px",
                        width: '100%',
                        height: '653px',
                        border: '1px solid black',
                        borderRadius: '60px',
                        layout: 'crop'
                    }} />
                {/* place on top of image */}
                <div className="flex-row" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <p className="text-white font-sans text-4xl font-semibold">Not sure where to go? Perfect.</p>
                    <br />
                    <button className="bg-white border rounded-full px-5 py-2 my-2">
                        <p className=" text-md">I'm flexible</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Banner
