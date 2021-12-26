
function Roombanner({ img }) {
    return (
        <div class="grid grid-cols-2 gap-4">
        <div>
            <img src={img} alt="#"
            className="img-fluid shadow-inner"
            style={{
                width: '100%',
                height: '457px',
                borderTopLeftRadius:"40px",
                borderBottomLeftRadius:"40px"
            }} />
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div>
                <img src={img} alt="#"
                className="img-fluid shadow-inner"
                style={{
                    width: '100%',
                    height: '220px',
                }} />
            </div>
            <div>
                <img src={img} alt="#"
                className="img-fluid shadow-inner"
                style={{
                    width: '100%',
                    height: '220px',
                    borderTopRightRadius:"40px",
                }} />
            </div>
            <div>
                <img src={img} alt="#"
                className="img-fluid shadow-inner"
                style={{
                    width: '100%',
                    height: '220px',
                }} />
            </div>
            <div>
                <img src={img} alt="#"
                className="img-fluid shadow-inner"
                style={{
                    width: '100%',
                    height: '220px',
                    borderBottomRightRadius:"40px",
                }} />
            </div>
        </div>
        
    </div>
    )
}

export default Roombanner
