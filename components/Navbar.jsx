'use client'
import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { MobileSidebar } from "@/components/MobileSidebar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";
import { PackageIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const Navbar = () => {
    const { user, isLoaded } = useUser();
    const { openSignIn } = useClerk();

    const router = useRouter();

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const cartCount = useSelector(state => state.cart.total);

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/shop?search=${search}`);
    }

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/shop", label: "Shop" },
        { href: "/", label: "About" },
        { href: "/", label: "Contact" },
    ];

    const handleLogin = async () => {
        setLoading(true);
        try {
            await openSignIn();
        } finally {
            setLoading(false);
        }
    }

    // user load না হলে লোডার দেখাবে
    const showLoginButton = isLoaded && !user;

    return (
        <nav className="relative bg-white">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-3 transition-all">

                    {/* Responsive Logo */}
                    <Logo />

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-700">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className=" hover:text-[#FFAD51] transition-all duration-300"
                            >
                                {link.label}
                            </Link>
                        ))}

                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full">
                            <Search size={18} className="text-slate-600" />
                            <input
                                className="w-full bg-transparent outline-none placeholder-slate-600"
                                type="text"
                                placeholder="Search products"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                required
                            />
                        </form>

                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
                            <ShoppingCart size={18} />
                            Cart
                            <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">{cartCount}</button>
                        </Link>

                        {/* Login / UserButton */}
                        {showLoginButton ? (
                            <button
                                onClick={handleLogin}
                                className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full flex items-center justify-center gap-2"
                            >
                                {loading ? <Spinner className="w-4 h-4" /> : "Login"}
                            </button>
                        ) : isLoaded && user ? (
                            <UserButton>
                                <UserButton.MenuItems>
                                    <UserButton.Action
                                        labelIcon={<PackageIcon size={16} />}
                                        label="My Orders"
                                        onClick={() => router.push('/orders')}
                                    />
                                </UserButton.MenuItems>
                            </UserButton>
                        ) : (
                            // loading state
                            <Spinner className="w-7 h-7" ></Spinner>
                        )}
                    </div>

                    {/* Mobile User Button And Menu */}
                    <div className="sm:hidden flex justify-center items-center gap-2">
                        <div>
                            {isLoaded && user ? (
                                <div className="flex gap-2">
                                    <UserButton>
                                        <UserButton.MenuItems>
                                            <UserButton.Action
                                                labelIcon={<ShoppingCart size={16} />}
                                                label="Cart"
                                                onClick={() => router.push('/cart')}
                                            />
                                            <UserButton.Action
                                                labelIcon={<PackageIcon size={16} />}
                                                label="My Orders"
                                                onClick={() => router.push('/orders')}
                                            />
                                        </UserButton.MenuItems>
                                    </UserButton>
                                </div>

                            ) : showLoginButton ? (
                                <button
                                    onClick={handleLogin}
                                    className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full flex items-center justify-center gap-2"
                                >
                                    {
                                        loading ?
                                            // loading state
                                            <Spinner className="w-4 h-4" >
                                            </Spinner> : "Login"
                                    }
                                </button>
                            ) : (
                                // loading state
                                <Spinner className="w-4 h-4" ></Spinner>
                            )}
                        </div>
                        {/* Responsive Menu */}
                        <MobileSidebar navLinks={navLinks} />
                    </div>
                </div>
            </div>
            <hr className="border-gray-300" />
        </nav>
    );
}

export default Navbar;
