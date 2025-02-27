'use client'
import { useMemo, useState } from "react";
import { Popup, RadioGroup, CheckboxGroup } from "@/app/components";
import { useTranslation } from "@/app/hooks/utils";
import { IconSettings } from '@/app/svgs';
import { getStorage, setStorage } from "@/app/hooks/storage";

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

const GameVersionSwitcher = () => {
  const t = useTranslation();
  const gameVersions = [
    { label: t('game_version_ds'), value: 'ds' },
    { label: t('game_version_dst'), value: 'dst' },
  ]
  const dsDLCs = [
    { label: t('ds_dlc_rog'), value: 'rog' },
    { label: t('ds_dlc_sw'), value: 'sw' },
    { label: t('ds_dlc_ham'), value: 'ham' },
  ]
  const allDsDLC = dsDLCs.map(_ => _.value)
  const [selectedGameVersion, setSelectedGameVersion] = useState(getStorage('selected-game-version') || 'ds')
  const [pickedDsDLC, setPickedDsDLC] = useState(getStorage('picked-ds-dlcs') || [])
  const dsDLCAlignStorage = (dsDLCArray: string[]) => {
    setPickedDsDLC(dsDLCArray)
    setStorage('picked-ds-dlcs', dsDLCArray)
  }
  const handleChangeVersion = (version: string) => {
    if (version === 'ds') {
      dsDLCAlignStorage(allDsDLC)
    } else if (version === 'dst') {
      dsDLCAlignStorage([])
    }
    setSelectedGameVersion(version)
    setStorage('selected-game-version', version)
  }
  const handleToggleDsDLC = (dlc: string) => {
    if (pickedDsDLC.includes(dlc)) {
      dsDLCAlignStorage(
        pickedDsDLC.filter((_dlc: string) => _dlc !== dlc)
      )
    } else {
      dsDLCAlignStorage(
        [...pickedDsDLC, dlc]
      )
    }
  }
  const banDsDLC = useMemo(() => selectedGameVersion === 'dst', [selectedGameVersion])
  return (
    <div className='flex items-center justify-center gap-[1rem]'>
      <RadioGroup
        options={gameVersions}
        selectOneInGroup={handleChangeVersion}
        selected={selectedGameVersion}
        radioSetName="game-version"
        className={`flex flex-col gap-[1rem]`}
      />
      <CheckboxGroup
        options={dsDLCs}
        toggleOneInGroup={handleToggleDsDLC}
        selectedGroup={pickedDsDLC}
        checkboxSetName="ds-version"
        groupDisabled={banDsDLC}
        classNames={`flex flex-col gap-[1rem] whitespace-nowrap`}
      />
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
        <GameVersionSwitcher />
      </Popup>
    </>
  );
}
