import { useState } from "react"
import { Link } from "react-router-dom"

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className=" p-4 fixed top-0 left-0 w-full z-100">
            <nav className="bg-white/50 rounded px-8 py-4 flex z-100 sm:uppercase  font-primary">
                <h1 id='logo'>
                    <Link
                        className="block w-[20px] h-[22px] sm:w-[22px] sm:h-[25px] bg-[url(/aaj.svg)] bg-cover bg-center"
                        to="/"
                        title='logo de mi agencia'
                        onClick={() => setIsOpen(false)}
                    ></Link>
                </h1>
                <ul className="flex gap-4 w-full tracking-tight leading-none justify-end items-center ">

                    <li>
                        <Link to="/gallery" className="hidden sm:block">work</Link>
                    </li>

                    <li>
                        <Link to="/offers" className="hidden sm:block">offers</Link>
                    </li>
                    <li className="hidden sm:block">
                        <Link to="/contact">start a project</Link>
                    </li>
                    <li className="sm:hidden">
                        <a
                            href=''
                            className=""
                            onClick={(e) => {
                                e.preventDefault();
                                setIsOpen(true)
                            }}
                        >
                            Menu
                        </a>
                    </li>
                </ul>
            </nav>

            {isOpen && (
                <div className="p-4 flex flex-col z-10 h-full w-full absolute left-0 top-0 bg-primary">
                    <nav className="sm:uppercase font-primary">
                        <ul className="flex gap-4 w-full justify-between items-center p-4">
                            <li>
                                <h1 id='logo'>
                                    <Link
                                        className="block w-[20px] h-[22px] sm:w-[50px] sm:h-[55px] bg-[url(/aaj.svg)] bg-cover bg-center"
                                        to="/"
                                        title='logo de mi agencia'
                                        onClick={() => setIsOpen(false)}
                                    ></Link>
                                </h1>
                            </li>
                            <li>
                                <a
                                    href=''
                                    className="sm:hidden"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsOpen(false)
                                    }}
                                >
                                    Close
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="h-full">
                        <ul className="flex flex-col h-full justify-end font-title text-6xl">
                            <li>
                                <Link to="/gallery" onClick={() => setIsOpen(false)}>Work</Link>
                            </li>

                            <li>
                                <Link to="/offers" onClick={() => setIsOpen(false)}>Offers</Link>
                            </li>
                            <li>
                                <Link to="/contact" onClick={() => setIsOpen(false)}>Start a Project</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header