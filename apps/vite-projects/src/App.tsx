import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Card } from "@repo/ui/card"

const LINKS = [
    {
        title: "Docs",
        href: "https://turbo.build/repo/docs",
        description: "Find in-depth information about Turborepo features and API.",
    },
    {
        title: "Learn",
        href: "https://turbo.build/repo/docs/handbook",
        description: "Learn more about monorepos with our handbook.",
    },
    {
        title: "Templates",
        href: "https://turbo.build/repo/docs/getting-started/from-example",
        description: "Choose from over 15 examples and deploy with a single click.",
    },
    {
        title: "Deploy",
        href: "https://vercel.com/new",
        description:
            " Instantly deploy your Turborepo to a shareable URL with Vercel.",
    },
];

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
        <div>
            {LINKS.map(({ title, href, description }) => (
                <Card href={href} key={title} title={title}>
                    {description}
                </Card>
            ))}
        </div>
    </>
  )
}

export default App
