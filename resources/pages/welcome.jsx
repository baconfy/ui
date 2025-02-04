import {Head} from '@inertiajs/react'
import {useState} from "react";

export default function Welcome() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  }

  return (
    <>
      <Head title="Welcome"/>

      <h1 onClick={increment} className="text-red-500">Welcome</h1>
      <h3>{count}</h3>
    </>
  )
}