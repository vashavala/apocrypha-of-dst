import { Container } from "@/app/components";
import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
const Layout: React.FC = () => {
  const PARTS = [
    { name: "recipes", src: '/images/pot.png' },
    { name: "characters", src: '/images/Wilson.png' },
    { name: "bosses", src: '/images/Dragonfly.png' },
  ]

  const layoutClassNames = useMemo(() => {
    const LAYOUT_CLASSNAMES = [
      null,
      null,
      null,
      'flex flex-wrap *:w-1/2 first:*:w-full',
    ];
    return LAYOUT_CLASSNAMES[PARTS.length];
  }, [PARTS.length])
  return (
    <div className={`aspect-square w-[min(100vw,100vh)] ${layoutClassNames}`}>
      {PARTS.map((part) => (
        <div key={part.name} className="flex items-center justify-center">
          <Link href={part.name} className="main-bg-radial h-1/2 aspect-square flex items-center justify-center rounded-full cursor-pointer relative group *:duration-500">
            <Image src={part.src} alt={part.name} fill className="absolute-central object-contain group-hover:blur-[0.1rem] !size-2/3" />
            <span className="absolute-central text-[var(--tc)] text-[2rem] font-black opacity-0 group-hover:opacity-100">{part.name}</span>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <Container classNamesOfMain="flex items-center justify-center">
      <Layout />
    </Container>
  );
}
