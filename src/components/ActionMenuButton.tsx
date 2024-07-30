import React from 'react';

import icons from '@/components/icons/icons';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ButtonViewReturnComponentProps } from '@/types';

interface IPropsActionMenuButton {
  icon?: any;
  title?: string;
  tooltip?: string;
  disabled?: boolean;
  shortcutKeys?: string[];
  color?: string;
  action?: ButtonViewReturnComponentProps['action'];
  isActive?: ButtonViewReturnComponentProps['isActive'];
}

const ActionMenuButton = (props: IPropsActionMenuButton) => {
  const Icon = icons[props.icon];

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          className='h-[32px] px-[5px] py-0 min-w-24 max-w-32'
          variant='ghost'
          disabled={props?.disabled}
        >
          <div className='flex items-center h-full font-normal'>
            {props?.title && (
              <div className='text-left truncate text-sm flex-grow'>{props?.title}</div>
            )}
            {Icon && <Icon className='w-3 h-3 ml-1 text-zinc-500 flex-shrink-0' />}
          </div>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <div className='max-w-24 text-center flex flex-col items-center'>
          {props?.tooltip && <div>{props?.tooltip}</div>}
          {/* <div className="flex" v-if="shortcutKeys && shortcutKeys.length">
          <span>{{ getShortcutKeys(shortcutKeys) }}</span>
        </div> */}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default ActionMenuButton;
