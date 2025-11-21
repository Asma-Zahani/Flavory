// components/Sidebar.tsx
import Link from 'next/link';

interface NavItem {
  href: string;
  icon: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: '/dashboard', icon: '👤', label: 'Mes Informations' },
  { href: '/dashboard/security', icon: '🔒', label: 'Sécurité & Mot de Passe' },
  { href: '/dashboard/favorites', icon: '❤️', label: 'Mes Favoris' },
  { href: '/dashboard/recipes', icon: '🍴', label: 'Mes Recettes Ajoutées' },
];

export default function Sidebar() {

  return (
    <aside className="w-64 p-6 bg-white border-r border-gray-100 shadow-lg md:shadow-none rounded-l-xl">
      <div className="text-center mb-10">
        {/* Profil - Inspiré par votre template */}
        <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-4 border-red-600">
          {/* Remplacer par l'image utilisateur */}
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-4xl">
             {/*  */}
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Maras Faron</h3>
        <p className="text-sm text-gray-500">UX/UI Designer</p>
      </div>

      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.href} className="mb-2">
              <Link
                href={item.href}
                className={`flex items-center p-3 rounded-lg transition duration-200 
                  ${
                    // pathname === item.href
                    //   ? 'bg-red-50 text-red-700 font-semibold border-l-4 border-red-600'
                    //   : 
                      'text-gray-600 hover:bg-gray-50 hover:text-red-600'
                  }`
                }
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mt-6 border-t pt-4">
            <button className="flex items-center p-3 w-full text-left rounded-lg text-gray-600 hover:bg-gray-50 hover:text-red-600 transition duration-200">
              <span className="mr-3 text-lg">🚪</span>
              Déconnexion
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}