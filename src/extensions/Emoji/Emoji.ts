import { TiptapProExtensionEmoji } from 'tiptap-extension-emoji';

import EmojiActionButton from '@/extensions/Emoji/components/EmojiActionButton';

import { listEmoji } from './emoji.constant';

export const Emoji = TiptapProExtensionEmoji.extend({
  addOptions() {
    return {
      // @ts-ignore
      ...this.parent?.(),
      HTMLAttributes: {},
      emojis: listEmoji,
      enableEmoticons: false,
      forceFallbackImages: false,
      button({ editor, t }: { editor: any; t: (...args: any[]) => string }) {
        return {
          component: EmojiActionButton,
          componentProps: {
            editor,
            action: (emoji: string) => {
              editor.chain().focus().setEmoji(emoji).run();
            },
            icon: 'Emoji',
            tooltip: t('editor.emoji.tooltip'),
          },
        };
      },
    };
  },
});
