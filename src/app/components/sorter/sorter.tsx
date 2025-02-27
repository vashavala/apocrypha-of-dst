import React, {
  forwardRef,
  useState,
  useImperativeHandle
} from "react";

import { IconSort } from "@/app/svgs"

export type SortState = 'off' | 'asc' | 'desc'

type SorterProps = {
  children?: React.ReactNode
  label?: string
  labelClassNames?: string
  classNames?: string
  onSortChange?: (state: SortState) => void;
}

export type SorterHandle = {
  getState: () => SortState;
  reset: () => void;
};

const Sorter = forwardRef<SorterHandle, SorterProps>(
  (props, ref) => {
    const {
      children,
      label = '',
      classNames = '',
      labelClassNames = '',
    } = props;

    const [sortState, setSortState] = useState<SortState>('off');

    useImperativeHandle(ref, () => ({
      getState: () => sortState,
      reset: () => setSortState('off')
    }));

    const handleClick = () => {
      const newState = sortState === 'off' ? 'asc' :
        sortState === 'asc' ? 'desc' : 'off';
      setSortState(newState);
      props.onSortChange?.(newState);
    }

    return (
      <div
        className={`h-[2rem] px-[.4rem] rounded-[.4rem] cursor-pointer border-[.1rem] flex items-center gap-[.4rem] whitespace-nowrap ${classNames}`}
        onClick={() => handleClick()}
      >
        {children || <span className={labelClassNames}>{label}</span>}
        <IconSort classNames="h-[1rem]" sortState={sortState} />
      </div>
    );
  }
);

Sorter.displayName = 'Sorter';

export default Sorter;