import {Link} from 'react-router-dom'

export default function HomePage() {
  const components = [
    {name: 'Accordion', path: '/accordion', description: 'Accordion com várias variantes e tamanhos'},
    {name: 'Button', path: '/button', description: 'Botões com várias variantes e tamanhos'},
    {name: 'Modal', path: '/modal', description: 'Modais e dialogs (em breve)'},
    {name: 'Input', path: '/input', description: 'Campos de entrada (em breve)'},
    {name: 'Card', path: '/card', description: 'Cards e containers (em breve)'},
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Baconfy UI</h1>
        <p className="text-xl text-gray-600">Biblioteca de componentes React</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {components.map((component) => (
          <Link key={component.name} to={component.path} className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{component.name}</h3>
            <p className="text-gray-600">{component.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}