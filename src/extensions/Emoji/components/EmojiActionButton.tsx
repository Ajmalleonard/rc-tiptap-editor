import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Popover } from '@radix-ui/react-popover';
import { Editor } from '@tiptap/react';

import ActionButton from '@/components/ActionButton';
import Icon from '@/components/icons/Icon';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useLocale } from '@/locales';
import { useTheme } from '@/theme/theme';
import { ButtonViewReturnComponentProps } from '@/types';

interface IProps {
  editor: Editor;
  icon?: any;
  tooltip?: string;
  disabled?: boolean;
  action?: ButtonViewReturnComponentProps['action'];
  isActive?: ButtonViewReturnComponentProps['isActive'];
}

const EmojiActionButton = (props: IProps) => {
  const { lang } = useLocale();
  const theme = useTheme();

  function onChange(emoji: any) {
    props.action?.(emoji?.id);
  }

  return (
    <Popover>
      <PopoverTrigger>
        <ActionButton tooltip={props?.tooltip} disabled={props?.disabled}>
          <span className='text-sm flex justify-center items-center'>
            <Icon name={props?.icon} />
          </span>
        </ActionButton>
      </PopoverTrigger>

      <PopoverContent hideWhenDetached>
        <Picker theme={theme || 'light'} locale={lang} data={data} onEmojiSelect={onChange} />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiActionButton;
