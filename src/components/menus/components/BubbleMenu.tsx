/* eslint-disable indent */
/* eslint-disable import/named */
/* eslint-disable multiline-ternary */
import { Fragment, useMemo } from 'react';

import { NodeSelection } from '@tiptap/pm/state';
import { BubbleMenu as BubbleMenuReact, Editor, Extension } from '@tiptap/react';

import { Separator } from '@/components/ui/separator';
import { BaseKitOptions } from '@/extensions';
import { useLocale } from '@/locales';

interface IPropsBubbleMenu {
  editor: Editor;
  disabled?: boolean;
}

const tippyOptions = {
  maxWidth: 'auto',
  zIndex: 20,
  appendTo: 'parent',
  moveTransition: 'transform 0.15s ease-out',
};

const ItemA = ({ item, disabled, editor }: any) => {
  const Comp = item.component;

  if (!Comp) {
    return <></>;
  }

  return (
    <Fragment>
      {item.type === 'divider' ? (
        <Separator orientation='vertical' className='mx-1 me-2 h-[16px]' />
      ) : (
        <>
          <Comp
            {...item.componentProps}
            editor={editor}
            disabled={disabled || item?.componentProps?.disabled}
          />
        </>
      )}
    </Fragment>
  );
};

const BubbleMenu = (props: IPropsBubbleMenu) => {
  const { t } = useLocale();
  const selection = props.editor.state.selection;

  const nodeType = useMemo(() => {
    let nodeT: string | undefined;

    if (!selection) {
      return undefined;
    }

    if (!props.editor) {
      return undefined;
    }

    if (selection instanceof NodeSelection) {
      const nodeName = selection.node.type.name;
      switch (nodeName) {
        case 'image': {
          nodeT = 'image';

          break;
        }
        default: {
          nodeT = undefined;
        }
      }
    }
    return nodeT;
  }, [props.editor, selection]);

  const extensions = props.editor.extensionManager?.extensions ?? [];

  const getItems = (nodeType: any) => {
    if (!nodeType) {
      return [];
    }

    let nodeMenus;
    const find = extensions.find((k: any) => k.name === 'base-kit') as Extension<BaseKitOptions>;
    if (!find) {
      nodeMenus = {};
    }

    const { button } = find.options?.bubble ?? {};

    if (!button) {
      nodeMenus = {};
    }

    nodeMenus = button({
      editor: props.editor,
      extension: find,
      t,
    });

    return nodeMenus?.[nodeType as any] ?? [];
  };

  const items = getItems(nodeType);

  return (
    <>
      {!!items?.length && (
        <BubbleMenuReact editor={props?.editor} tippyOptions={tippyOptions as any}>
          <div className='border border-neutral-200 dark:border-neutral-800 px-3 py-2 transition-all select-none pointer-events-auto shadow-sm rounded-sm w-auto bg-background'>
            <div className='flex items-center flex-nowrap whitespace-nowrap h-[26px] justify-start relative'>
              {items?.map((item: any, key: any) => {
                return (
                  <ItemA
                    key={`bubbleMenu-${key}`}
                    item={item}
                    disabled={props.disabled}
                    editor={props.editor}
                  />
                );
              })}
            </div>
          </div>
        </BubbleMenuReact>
      )}
    </>
  );
};

export default BubbleMenu;
