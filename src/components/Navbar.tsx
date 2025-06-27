import { useSelector } from "react-redux"
import { NavLink } from "react-router"
import type { RootState } from "../app/store"
const Navbar = () => {
    const { productCart } = useSelector(({cart}: RootState) => cart);
    console.log(".........", productCart);
    
    const navItems = [
        { to: "/", text: "LOGO" },
        { to: "/cartItems", text: `cart items(${productCart.length})` },
    ]

    // render nav items
    const renderNavItems = () => (
        <>
            {
                navItems.map((item) => {
                    return (
                        <li key={item.to}>
                            <NavLink to={item.to}
                                className={"font-semibold text-xl"}
                            >
                                {item.text}
                            </NavLink>
                        </li>
                    )
                })
            }
        </>
    )

    return (
        <div className="container mx-auto px-2">
            <div className="bg-green-600 py-3 rounded mt-3 text-white">
                <ul className="flex items-center justify-center gap-4">
                    {renderNavItems()}
                </ul>
            </div>
        </div>
    )
}

export default Navbar