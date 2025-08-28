import {Link, Outlet, useLocation} from 'react-router-dom'
import {Button} from "../../src/components/ui/button";

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen">
      <header className="container mx-auto">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="text-2xl font-black text-gray-900">Baconfy UI</Link>

          <nav className="flex space-x-4">
            <Button size="small" variant={location.pathname === '/' ? 'default' : 'outline'} asChild>
              <Link to="/">Home</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-8 space-y-12">
        <Outlet/>
      </main>
    </div>
  )
}