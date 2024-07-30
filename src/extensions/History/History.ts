/* eslint-disable indent */
import type { HistoryOptions as TiptapHistoryOptions } from '@tiptap/extension-history';
import { History as TiptapHistory } from '@tiptap/extension-history';

import ActionButton from '@/components/ActionButton';
import type { GeneralOptions } from '@/types';

export interface HistoryOptions extends TiptapHistoryOptions, GeneralOptions<HistoryOptions> {}

const historys: ['undo', 'redo'] = ['undo', 'redo'];

export const History = TiptapHistory.extend<HistoryOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      depth: 100,
      newGroupDelay: 500,
      button: ({ editor, t }: any) => {
        return historys.map((item) => ({
          component: ActionButton,
          componentProps: {
            action: () => {
              if (item === 'undo') {
                editor.chain().focus().undo().run();
              }
              if (item === 'redo') {
                editor.chain().focus().redo().run();
              }
            },
            shortcutKeys: item === 'undo' ? ['mod', 'Z'] : ['shift', 'mod', 'Z'],
            disabled: item === 'undo' ? !editor.can().undo() : !editor.can().redo(),
            icon: item === 'undo' ? 'Undo2' : 'Redo2',
            tooltip: t(`editor.${item}.tooltip`),
          },
        }));
      },
    };
  },
});
