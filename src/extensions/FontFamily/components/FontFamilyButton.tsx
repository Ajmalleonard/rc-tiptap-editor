import React, { Fragment, useMemo } from 'react';

import ActionMenuButton from '@/components/ActionMenuButton';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ButtonViewReturnComponentProps } from '@/types';

export interface Item {
  title: string;
  icon?: any;
  font?: string;
  isActive: NonNullable<ButtonViewReturnComponentProps['isActive']>;
  action?: ButtonViewReturnComponentProps['action'];
  style?: React.CSSProperties;
  shortcutKeys?: string[];
  disabled?: boolean;
  divider?: boolean;
  default?: boolean;
}

interface Props {
  editor: any;
  disabled?: boolean;
  color?: string;
  shortcutKeys?: string[];
  maxHeight?: string | number;
  tooltip?: string;
  items?: Item[];
}

const FontFamilyButton = (props: Props) => {
  const active = useMemo(() => {
    const find: any = props?.items?.find((k: any) => k.isActive());

    if (find && !find.default) {
      return {
        ...find,
      };
    }
    const item: Item = {
      title: props.tooltip as any,
      font: 'Default',
      isActive: () => false,
      disabled: false,
      action: () => props.editor.chain().focus().unsetFontFamily().run(),
    };
    return item;
  }, [props]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={props?.disabled}>
        <ActionMenuButton
          title={active?.font?.length > 7 ? `${active?.font?.slice(0, 6)}...` : active?.font}
          tooltip={props?.tooltip}
          disabled={props?.disabled}
          icon='MenuDown'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-full'>
        {props?.items?.map((item: any, index) => {
          return (
            <Fragment key={index}>
              <DropdownMenuCheckboxItem checked={active?.font === item.font} onClick={item.action}>
                <div className={`ml-1 h-full heading-${item.font}`}>{item.font}</div>
              </DropdownMenuCheckboxItem>
              {item.font === 'Default' && <DropdownMenuSeparator />}
            </Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FontFamilyButton;
