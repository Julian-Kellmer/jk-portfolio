const UsCard = ({ img, name, role, skils, quote }) => {
    return (
        <div className="flex w-full h-[80svh] justify-between  gap-16">
            <div className="flex-1 px-32 info flex flex-col  justify-between">
                <div>
                    <h5 className="font-title leading-none tracking-tighter capitalize text-[92px] text-white ">{quote}</h5>
                </div>
                <div className="flex w-full justify-between font-primary  leaning-none tracking-tighter">
                    <div className="self-end">
                        <div className="flex flex-col ">
                            <p className="text-blue-600 leading-4 text-2xl">{name}</p>
                            <p className=" text-2xl text-white">{role}</p>
                        </div>
                    </div>
                    <div>
                        <ul className="text-white">
                            {skils.map((skill, index) => {
                                return <li className="text-[24px]" key={index}>{skill}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="foto h-full flex-1 ">
                <div className=" w-3/4 h-full ">
                    <img src={img} className="object-cover" alt={name} />
                </div>
            </div>
        </div>
    )
}
export default UsCard