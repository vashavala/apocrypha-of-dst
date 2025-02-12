import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  classNames?: string
  classNamesOfMain?: string
}

export default function Container(props: ContainerProps) {
  const { children, header, footer, classNames = '', classNamesOfMain = '' } = props
  return (
    <div className={`w-screen h-screen ${classNames}`}>
      {header && <header></header>}
      <main className={`w-full h-full overflow-auto ${classNamesOfMain}`}>
        {children}
      </main>
      {footer && <footer></footer>}
    </div>
  );
}
