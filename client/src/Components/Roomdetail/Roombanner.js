
function Roombanner({ img }) {
    const n = img?.length
    console.log(n)
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg transform transition duration-500 hover:scale-110" style={{zIndex:"2"}}>
                <img src={img[0]} alt="#"
                    className="img-fluid shadow-inner"
                    style={{
                        width: '100%',
                        height: '457px',
                        borderTopLeftRadius: "40px",
                        borderBottomLeftRadius: "40px"
                    }} />
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div className="rounded-lg transform transition duration-500 hover:scale-110">
                    <img src={img[1]} alt="#"
                        className="img-fluid shadow-inner"
                        style={{
                            width: '100%',
                            height: '220px',
                        }} />
                </div>
                <div className="rounded-lg transform transition duration-500 hover:scale-110">
                    <img src={img[2]} alt="#"
                        className="img-fluid shadow-inner"
                        style={{
                            width: '100%',
                            height: '220px',
                            borderTopRightRadius: "40px",
                        }} />
                </div>
                <div className="rounded-lg transform transition duration-500 hover:scale-110">
                    <img src={img[3]} alt="#"
                        className="img-fluid shadow-inner"
                        style={{
                            width: '100%',
                            height: '220px',
                        }} />
                </div>
                <div className="rounded-lg transform transition duration-500 hover:scale-110">
                    <img src={img[4]} alt="#"
                        className="img-fluid shadow-inner"
                        style={{
                            width: '100%',
                            height: '220px',
                            borderBottomRightRadius: "40px",
                        }} />
                </div>
            </div>

        </div>
    )
}

export default Roombanner
