import Link from "next/link";

export default function Home() {
  const links = [
    { href: "/product", text: "Product" },
    { href: "/customer", text: "Customer" },
    { href: "/animate", text: "Animate" },
    { href: "/store", text: "Store" },
  ];

  return (
    <div className="flex justify-center items-center h-screen gap-4 bg-white">
      {links.map((link) => (
        <Link key={link.href} className="text-blue-500" href={link.href}>
          {link.text}
        </Link>
      ))}
    </div>
  );
}
