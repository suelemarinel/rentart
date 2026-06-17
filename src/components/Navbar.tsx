import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 h-[60px] flex items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-tight text-gray-900">
          rent<span className="italic text-gray-400">art</span>
        </Link>
        <ul className="flex gap-8 list-none">
          <li><Link href="/" className="text-xs font-medium text-gray-900 tracking-wide">Catalogue</Link></li>
          <li><Link href="/a-propos" className="text-xs font-medium text-gray-400 hover:text-gray-900 tracking-wide transition-colors">À propos</Link></li>
          <li><Link href="/contact" className="text-xs font-medium text-gray-400 hover:text-gray-900 tracking-wide transition-colors">Contact</Link></li>
        </ul>
        <button className="text-xs font-medium bg-gray-900 text-white px-4 py-2 rounded-full hover:opacity-80 transition-opacity">
          Louer une œuvre
        </button>
      </div>
    </nav>
  )
}