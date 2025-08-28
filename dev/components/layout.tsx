import {Link, Outlet, useLocation} from 'react-router-dom'

import {cn} from "@/lib";
import {AlignLeft, X} from "lucide-react";
import {ReactNode} from "react";

export default function Layout() {
  const location = useLocation()

  const navigation = {
    ui: [
      {name: 'Accordion', path: '/accordion'},
      {name: 'Alert', path: '/alert'},
      {name: 'Alert Dialog', path: '/alert-dialog'},
      {name: 'Button', path: '/button'},
    ],
  };

  return (
    <>
      <div className="flex min-h-screen bg-muted text-muted-foreground">
        <input type="checkbox" id="toggle-sidebar" className="peer hidden"/>
        <label htmlFor="toggle-sidebar" className="absolute inset-0 z-[10] hidden backdrop-blur backdrop-brightness-80 transition-all duration-75 peer-checked:flex md:hidden"/>

        <aside
          className={cn(
            'peer-checked:translate-x-0 peer-checked:delay-0 peer-checked:ease-in-out peer-checked:animate-in',
            'absolute inset-0 z-[20] flex w-[90vw] flex-col items-start justify-between border-r border-primary/10 px-6 py-8 shadow',
            'max-lg:-translate-x-full max-lg:transform max-lg:transition-all max-lg:duration-200',
            'md:relative md:w-[15vw] md:max-w-[15vw] md:min-w-[15vw] md:translate-x-0 md:border-none md:shadow-none',
          )}
        >
          <div className="flex items-center justify-between w-full">
            <Brand/>

            <label htmlFor="toggle-sidebar" className="md:hidden">
              <X className="size-8"/>
            </label>
          </div>

          <div className="size-full flex flex-col gap-8 py-8">
            {Object.entries(navigation).map((block) => (
              <nav key={block[0]}>
                <Heading>{block[0]}</Heading>
                {block[1].map((item) => (
                  <div key={item.path} className="ml-4 mb-1">
                    <Link to={item.path} className={cn({'block text-primary font-bold': location.pathname === item.path})}>{item.name}</Link>
                  </div>
                ))}
              </nav>
            ))}
          </div>
        </aside>

        <main className="grow">
          <header className="flex items-center justify-between md:hidden">
            <label htmlFor="toggle-sidebar">
              <AlignLeft className="size-8"/>
            </label>

            <Brand/>

            <a href="https://github.com/baconfy/ui" target="_blank" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github-icon lucide-github size-8">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
            </a>
          </header>

          <div className="overflow-auto no-scrollbar p-12">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  )
}

const Heading = ({children}: { children: ReactNode }) => <h2 className="uppercase font-black tracking-tight mb-2">{children}</h2>

export const Brand = () => <Link to="/" className="text-2xl font-black text-gray-900">Baconfy UI</Link>


