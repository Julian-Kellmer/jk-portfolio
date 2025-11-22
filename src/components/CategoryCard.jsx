import { Link } from "react-router-dom"
const CategoryCard = ({ title, img, name, desc }) => {
    return (
        <div className="category-panel p-24 shrink-0 w-screen h-full flex items-center justify-center">
            <div className="w-full h-full gap-4 relative flex">
                <div className="absolute top-1/8 flex flex-col gap-4 left-1/8 w-1/3">

                    <h2 id="title" className=" text-[96px] font-primary tracking-tighter leading-none text-white capitalize  ">{title}</h2>
                    <Link
                        to={`/gallery?category=${title}`}
                        className="text-xl px-4 text-white font-primary tracking-tighter leading-none hover:underline"
                    >
                        Ver proyectos de {title}
                    </Link>
                </div>
                <div className="flex-2"></div>
                <div id="image-cont" className="flex-3 flex outline">
                    <div className="w-full h-3/4 self-center bg-[#2269E1] overflow-hidden">
                        <img src={img} className="object-cover" alt={name} />
                    </div>
                </div>
                <div className="flex-2 flex flex-col justify-end">
                    <div id="info" className="pb-24 tracking-tighter font-primary text-white w-full h-100 flex flex-col justify-end">
                        <h4 className="text-2xl capitalize">{name}</h4>
                        <p className="mb-24 text-white/50">Proyecto bi-mestral seleccionado</p>
                        <p className="text-xl leading-none w-2/3">{desc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CategoryCard