
// from https://dontstarve.fandom.com/wiki/Food 
// process data into food.json
// mouse focus on tbody element
// script:
// [...$0.querySelectorAll('tr')].map(tr => {
//   const tds = [...tr.querySelectorAll('td')]
//   return {
//       icon: tds[0].querySelector('a img')?.alt,
//       name: tds[1]?.innerText,
//       hunger: tds[3]?.innerText,
//       sanity: tds[4]?.innerText,
//       healter: tds[5]?.innerText,
//       perishTime: tds[6]?.innerText,
//       foodType: tds[7]?.innerText,
//       effect: tds[8]?.innerText,
//       dlcs: tds[2] && [...tds[2].querySelectorAll('a')].map(a => a?.title)
//   }
// })
'use client'
import { useState } from "react";
import Image from 'next/image';
import { Container } from "@/app/components";
import { Settings } from "@/app/biz-components";
import { useTranslation } from "@/app/hooks/utils";
import FOOD_LIST_RAW from './food.json'

type Row = {
  name: string
  icon: string
  hunger: string
  sanity: string
  health: string
  perishTime: string
  foodType: string
  effect: string
  dlcs: string[]
}


export default function Food() {
  const t = useTranslation()

  const getSrc = (dlcName: string) => {
    const DLC_MAP: Record<string, string> = {
      "Don't Starve Together": "/images/dst.webp",
      "": "/images/rog.webp",
      "Hamlet": "/images/ham.webp",
      "Shipwrecked": "/images/sw.webp",
    }
    return DLC_MAP[dlcName]
  }

  const [foodList, setFoodList] = useState(FOOD_LIST_RAW)
  return (
    <Container classNamesOfMain="">
      <table>
        <thead>
          <tr>
            <th>{t('icon')}</th>
            <th>{t('name')}</th>
            <th className="relative w-[2rem] h-[2rem]">
              <Image
                src={'/images/Health_Meter.webp'}
                alt={'alt'}
                fill
                className="inset-0 object-cover object-center"
              />
            </th>
            <th className="relative w-[2rem] h-[2rem]">
              <Image
                src={'/images/Sanity_Meter.webp'}
                alt={'alt'}
                fill
                className="inset-0 object-cover object-center"
              />
            </th>
            <th className="relative w-[2rem] h-[2rem]">
              <Image
                src={'/images/Hunger_Meter.webp'}
                alt={'alt'}
                fill
                className="inset-0 object-cover object-center"
              />
            </th>
            <th className="relative w-[2rem] h-[2rem]">
              <Image
                src={'/images/Rot_Meter.webp'}
                alt={'alt'}
                fill
                className="inset-0 object-cover object-center"
              />
            </th>
            <th>{t('foodType')}</th>
            <th>{t('effect')}</th>
            <th>{t('dlcs')}</th>
          </tr>
        </thead>
        <tbody>
          {foodList.map(food => (
            <tr key={food.name}>
              <td className="relative">
                <Image
                  src={'/images/dst.webp'}
                  alt={'alt'}
                  fill
                  className="inset-0 object-cover object-center"
                />
              </td>
              <td>{food.name}</td>
              <td>{food.hunger}</td>
              <td>{food.sanity}</td>
              <td>{food.health}</td>
              <td>{food.perishTime}</td>
              <td>{food.foodType}</td>
              <td>{food.effect}</td>
              <td className="w-[2rem] h-[2rem] relative">
                {(food.dlcs ?? []).map((dlc, index) => (
                  dlc && <Image
                    key={index}
                    src={getSrc(dlc)}
                    alt={dlc}
                    fill
                    className="inset-0 object-cover object-center"
                  />
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Settings />
    </Container>
  );
}
