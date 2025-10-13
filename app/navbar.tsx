import Link from "next/link";

export default function Navbar() {
  const links = [
    { href: "/", text: "Home" },
    { href: "/product", text: "Product" },
    { href: "/customer", text: "Customer" },
    { href: "/animate", text: "Animate" },
    { href: "/store", text: "Store" },
  ];
  return (
    <nav className="flex gap-4 justify-center bg-gray-100 p-4 shadow-md">
    {links.map((link) => (
      <Link key={link.href} className="text-blue-500 hover:text-blue-700" href={link.href}>
        {link.text}
      </Link>
    ))}
  </nav>
  );
}