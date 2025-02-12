'use client'
import Image from 'next/image';
import { useState } from "react";
import { Popup } from "@/app/components";
import { useTranslation } from "@/hooks/utils";
import { IconSettings } from '@/app/svgs';

const LangSwitcher = () => {
  const t = useTranslation();
  const [lang, setLang] = useState(localStorage.getItem('vasha-i18') || 'en');
  const languageArr = [
    { label: 'lang_en', value: 'en' },
    { label: 'lang_cn', value: 'cn' },
  ];
  const switchLang = (langVal: string) => {
    if (langVal === lang) return;
    setLang(langVal)
    localStorage.setItem('vasha-i18', langVal)
    location.reload()
  }
  return (
    <div className="flex items-center justify-center gap-[1rem]">
      {languageArr.map((language) => (
        <div className={`
            w-[6rem] aspect-[2] flex items-center justify-center border-2 rounded-[0.5rem] cursor-pointer
            ${language.value === lang ? 'border-[var(--tc)]' : 'border-gray-500'}
          `} key={language.value}
          onClick={() => switchLang(language.value)}>
          {t(language.label)}
        </div>
      ))}
    </div>
  )
}

const GameSwitcher = () => {
  const versions = [
    { value: 'dst', src: '/images/version-dst.png' },
    { value: 'ham', src: '/images/version-ham.png' },
    { value: 'sw', src: '/images/version-sw.png' },
    { value: 'rog', src: '/images/version-rog.png' },
  ]
  const [version] = useState(localStorage.getItem('vasha-game-version') || 'dst')
  const siwtchGameVersion = (versionVal: string) => {
    localStorage.setItem('vasha-game-version', versionVal)
    location.reload()
  }
  return (
    <div className='flex items-center justify-center gap-[1rem]'>
      {versions.map(v =>
        <div key={v.value} className='w-[4rem] h-[4rem] relative cursor-pointer' onClick={() => siwtchGameVersion(v.value)}>
          <Image src={v.src} alt={v.value} fill className={version === v.value ? `` : `blur-[2px] grayscale`} />
        </div>
      )}
    </div>
  )
}

export default function Recipes() {
  const t = useTranslation();
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className="fixed z-50 aspect-square rounded-full bg-black w-[4rem] bottom-[2vh] right-[2vh] shadow shadow-white flex items-center justify-center cursor-pointer" onClick={() => setVisible(true)}>
        <IconSettings classNames="w-2/3" />
      </div>
      <Popup onClose={() => setVisible(false)} show={visible} title={t('settings')} sectionClassNames="flex flex-col items-center *:mt-[2rem]">
        <LangSwitcher />
        <GameSwitcher />
      </Popup>
    </>
  );
}
