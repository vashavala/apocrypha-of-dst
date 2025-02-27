/*
  // download all images
  // https://dontstarve.fandom.com/wiki/Crock_Pot#Recipes_for_the_Crock_Pot
  (async () => {
    const targetDom = document.querySelector('.wikitable.crockpot-recipes');
    const images = targetDom.querySelectorAll('img');
    const dirHandle = await window.showDirectoryPicker();
    
    for (const [index, img] of images.entries()) {
      const response = await fetch(img.src);
      const blob = await response.blob();
      const fileHandle = await dirHandle.getFileHandle(`${img.alt}.${blob.type.split('/')[1]}`, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
    }
  })();
*/
/*
  // get all data
  // https://dontstarve.fandom.com/wiki/Crock_Pot#Recipes_for_the_Crock_Pot
  trs = [...$0.querySelectorAll('tr')]
  getData = tr => {
    const tds = [...tr.querySelectorAll('td')]
    return {
      name: tds[1]?.innerText || 'name',
      hunger: tds[3]?.innerText || 'hunger',
      sanity: tds[4]?.innerText || 'san',
      health: tds[5]?.innerText || 'hp',
      rotTime: tds[6]?.innerText || 'rotT',
      cookTime: tds[7]?.innerText || 'cookT',
      priority: tds[8]?.innerText || 'pri',
      DLCs: tr?.className || 'cn'
    }
  }
*/
'use client'
import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/app/hooks/utils";
import { Container, Sorter, SorterHandle, SortState, /* Checkbox, CheckboxGroup */ } from "@/app/components";
import { getGameVersion } from "@/app/hooks/services";
import { Food } from "@/app/constant/type";
import { FontBds } from "@/app/biz-components";
import RECIPES from './recipes.json'
// import __Artboard from "@/app/svgs/__artboard";

type Dish = Food & {
  priority: string
  cookTime: string
  mandatory: string[]
  restrictions: string[]
}

// const SortUnit = (property: string) => {
//   return (
//     <div className="p-[.4rem] rounded-[.4rem] cursor-pointer border-[.1rem] flex items-center gap-[.4rem]">
//       <div>{property}</div>
//       <IconSort classNames="h-[1rem]" />
//     </div>
//   )
// }

// const isWarlyDish = () => (
//   <div className="relative w-[1.6rem] h-[1.6rem]">
//     <Image src={`/images/characters/Warly.png`} alt={'Warly'} fill className="object-contain" />
//   </div>
// )

// const notWarlyDish = () => (
//   <div className="relative w-[1.6rem] h-[1.6rem]">
//     <IconBan classNames="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] size-full" />
//     <Image src={`/images/characters/Warly.png`} alt={'Warly'} fill className="object-contain z-[1]" />
//   </div>
// )

export default function Recipes() {
  const t = useTranslation()
  const [gameVersion, setGameVersion] = useState(getGameVersion())

  /* advance options */
  // const [dishesAdvanceFilterOn, setDishesAdvanceFilterOn] = useState<'on' | 'off'>('off')
  // const handleSwitchingAdvanceFilter = () => {
  //   setDishesAdvanceFilterOn(prev => prev === 'on' ? 'off' : 'on')
  // }

  /* dish type */
  // const dishTypes = [
  //   { label: t('veggie'), value: 'veggie' },
  //   { label: t('meat'), value: 'meat' },
  // ]
  // const [selectedDishType, setSelectedDishType] = useState(dishTypes.map(type => type.value))
  // const handleChangeDishType = (value: string) => {
  //   if (selectedDishType.includes(value)) {
  //     setSelectedDishType(selectedDishType.filter(type => type !== value));
  //   } else {
  //     setSelectedDishType([...selectedDishType, value]);
  //   }
  // }

  /* warly */
  // const warlyDishOptions = [
  //   { value: 'isWarlyDish', customChildren: isWarlyDish() },
  //   { value: 'notWarlyDish', customChildren: notWarlyDish() },
  // ]
  // const [selectedWarlyDishOptions, setSelectedWarlyDishOptions] = useState(warlyDishOptions.map(option => option.value))
  // const handleChangeWarlyDishOption = (value: string) => {
  //   if (selectedWarlyDishOptions.includes(value)) {
  //     setSelectedWarlyDishOptions(selectedWarlyDishOptions.filter(option => option !== value));
  //   } else {
  //     setSelectedWarlyDishOptions([...selectedWarlyDishOptions, value]);
  //   }
  // }

  const [recipes, setRecipes] = useState(RECIPES as Dish[])
  const nameSorterRef = useRef<SorterHandle>(null)
  const hungerSorterRef = useRef<SorterHandle>(null)
  const healthSorterRef = useRef<SorterHandle>(null)
  const sanitySorterRef = useRef<SorterHandle>(null)
  const rotTimeSorterRef = useRef<SorterHandle>(null)

  const nameSortChange = (state: SortState) => {
    if (state === 'off') return;
    setRecipes(RECIPES)
  }
  const hungerSortChange = (state: SortState) => {
    if (state === 'off') return;
    setRecipes(RECIPES.sort((a, b) => state === 'asc' ? +a.hunger - +b.hunger : +b.hunger - +a.hunger))
  }
  const healthSortChange = (state: SortState) => {
    if (state === 'off') return;
    setRecipes(RECIPES.sort((a, b) => state === 'asc' ? +a.health - +b.health : +b.health - +a.health))
  }
  const sanitySortChange = (state: SortState) => {
    if (state === 'off') return;
    setRecipes(RECIPES.sort((a, b) => state === 'asc' ? +a.sanity - +b.sanity : +b.sanity - +a.sanity))
  }
  const rotTimeSortChange = (state: SortState) => {
    if (state === 'off') return;
    setRecipes(RECIPES.sort((a, b) => state === 'asc' ? +a.rotTime - +b.rotTime : +b.rotTime - +a.rotTime))
  }
  return (
    <Container classNamesOfMain="">
      {/* recipes-container */}
      <div className="w-full overflow-hidden">
        {/* <__Artboard /> */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-[.4rem]">
            <Sorter label={t('name')} ref={nameSorterRef} onSortChange={(state) => nameSortChange(state)} />
          </div>

          <div className="flex items-center gap-[.4rem]">
            <Sorter label={t('hunger')} ref={hungerSorterRef} onSortChange={(state) => hungerSortChange(state)} />
            <Sorter label={t('sanity')} ref={sanitySorterRef} onSortChange={(state) => sanitySortChange(state)} />
            <Sorter label={t('health')} ref={healthSorterRef} onSortChange={(state) => healthSortChange(state)} />
            <Sorter label={t('rot_time')} ref={rotTimeSorterRef} onSortChange={(state) => rotTimeSortChange(state)} />
          </div>

          {/* <Checkbox
            checkboxSetName="dishes-advance-filter-switcher"
            toggleOneInGroup={handleSwitchingAdvanceFilter}
            selectedGroup={[dishesAdvanceFilterOn]}
            label={t('advance_dish_filter_options')}
            value={'on'}
          />

          <div className="flex flex-col items-start">
            <div className="flex">
              <div className="h-[2rem] px-[.4rem] rounded-[.4rem] cursor-pointer border-[.1rem] flex items-center gap-[.4rem] whitespace-nowrap">
                <div>{t('cook_time')}</div>
                <IconSort classNames="h-[1rem]" />
              </div>
              <div className="h-[2rem] px-[.4rem] rounded-[.4rem] cursor-pointer border-[.1rem] flex items-center gap-[.4rem] whitespace-nowrap">
                <div>{t('priority')}</div>
                <IconSort classNames="h-[1rem]" />
              </div>
            </div>
            <CheckboxGroup
              options={dishTypes}
              toggleOneInGroup={handleChangeDishType}
              selectedGroup={selectedDishType}
              checkboxSetName="dish-type"
              classNames={`flex`}
            />
            <CheckboxGroup
              options={warlyDishOptions}
              toggleOneInGroup={handleChangeWarlyDishOption}
              selectedGroup={selectedWarlyDishOptions}
              checkboxSetName="whether-warly-dish"
              classNames={`flex`}
            />
          </div> */}
        </div>
        <div className={`recipes flex flex-wrap`}>
          {recipes.map(recipe => (
            <div key={recipe.name} className="flex flex-col items-center border">
              <div className="relative w-[8rem] h-[8rem]">
                <Image src={`/images/recipes/${recipe.name}.png`} alt={recipe.name} fill className="object-contain" />
              </div>
              <div>{recipe.name}</div>
              <div className="flex items-center *:relative *:bg-cover *:w-[4rem] *:h-[4rem] *:flex *:items-center *:justify-center *:font-[900] *:text-[1.2rem]">
                <div className="bg-[url(/images/common/Hunger.png)]"> {recipe.hunger} </div>
                <div className="bg-[url(/images/common/Sanity.png)]"> {recipe.sanity} </div>
                <div className="bg-[url(/images/common/Health.png)]"> {recipe.health} </div>
                <div className="bg-[url(/images/common/Rot.png)]"> {recipe.rotTime} </div>
              </div>
              <div className="mandatory">
                {recipe.mandatory.map((ingredient, idx) => <div key={idx}>{ingredient}</div>)}
              </div>
              <div className="restrictions">
                {recipe.restrictions.map((restrict, idx) => <div key={idx}>{restrict}</div>)}
              </div>
            </div>
          ))}
        </div>
      </div>

    </Container>
  )
}