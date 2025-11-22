const GalleryCard = ({name,type,img}) => {
    return (
        <div className="work-cnt col-span-6 xl:col-span-4 4xl:col-span-3 flex flex-col gap-y-[10px] items-center group self-start ">
            <div className="img-cont w-full object-contain">
                <img src={img} className="object-cover" alt="" />
            </div>
            <div className="info-cnt font-primary leaning-none tracking-tighter">
                <p>{name} / {type}</p>
            </div>
        </div>
    )
}
export default GalleryCard