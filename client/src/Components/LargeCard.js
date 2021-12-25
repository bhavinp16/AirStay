import { Link } from "react-router-dom"

function LargeCard({ img, title, description, buttonText }) {
    return (
        <section className="relative py-16 cursor-pointer">
            <div className="relative h-96 min-w-[300px]">
                <img
                    src={img}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                    alt="#"
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </div>
            <div className="absolute top-32 left-12">
                <h3 className="text-4xl mb-3 w-64">{title}</h3>
                <p>{description}</p>

                <div className="mt-5">
                    <Link to="/curratedList" className="text-sm text-white bg-gray-900 px-4 py-2 rounded-lg ">{buttonText}</Link>
                </div>

            </div>
        </section>
    )
}

export default LargeCard
