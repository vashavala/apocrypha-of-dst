'use client'
import { useScreenType } from "@/app/hooks/utils";
import { useMemo } from "react";

interface PopupProps {
  children: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  title?: string
  sectionClassNames?: string
  show?: boolean;
  onClose?: () => void
}

export default function Popup(props: PopupProps) {
  const { isMobile } = useScreenType()
  const defaultPosition = useMemo(() => isMobile ? 'bottom' : 'right', [isMobile])
  const { show = false, children, position = defaultPosition, title = '', sectionClassNames = '', onClose = () => { } } = props
  return (show && (
    <div className="z-[100] fixed inset-0 w-screen h-screen backdrop-blur-sm">
      <div className="size-full absolute inset-0"></div>
      <div className={`absolute
          ${position === 'left' && 'left-0 inset-y-0 h-full w-1/3'}
          ${position === 'right' && 'right-0 inset-y-0 h-full w-1/3'}
          ${position === 'bottom' && 'bottom-0 inset-x-0 w-full h-1/2'}
          ${position === 'top' && 'top-0 inset-x-0 w-full h-1/2'}
          flex flex-col bg-[var(--bgc)]
          *:px-[2rem]
        `}>
        <section className={`${isMobile ? 'h-[54px]' : 'h-[90px]'} flex items-center justify-between`}>
          <div>{title}</div>
          <svg viewBox="0 0 100 100" className="w-[12px] h-[12px] cursor-pointer" onClick={() => onClose()}>
            <path d="M0 0 L100 100" className="stroke-[24] stroke-[#fff] fill-none" />
            <path d="M100 0 L0 100" className="stroke-[24] stroke-[#fff] fill-none" />
          </svg>
        </section>
        <section className={`flex-1 overflow-auto ${sectionClassNames}`}>{children}</section>
        {/* <section>footer</section> */}
      </div>
    </div>
  ))
}