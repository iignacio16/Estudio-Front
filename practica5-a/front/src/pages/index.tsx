import Link from "next/link"

export default function Home() {
  return (
    <>
      <Link href={"/medico"}>Ir a medico</Link> {"  "}
      <Link href={"/paciente"}>Ir a paciente</Link>
    </>
  )
}
