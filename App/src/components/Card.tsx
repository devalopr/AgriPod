export default function Card({ data, text, image }: any) {
    return (
        <>
            <div className="bg-white border border-gray-400 rounded-md" style={{ "padding": "10px", "margin": "10px" }}>
                <div className="flex items-center">

                    <img src={image} alt="" className="w-7" />
                    <h3 className="pl-3"> <span className="font-bold">{text}</span>: <br /> {data}</h3>
                </div>
            </div>
        </>
    )
}