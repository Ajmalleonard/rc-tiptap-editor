---
description: How to install rc-tiptap-editor

next:
  text: Alignment
  link: /extensions/align/text-align.md
---

# Installation

::: code-group

```sh [npm]
npm install rc-tiptap-editor
```

```sh [pnpm]
pnpm install rc-tiptap-editor
```

```sh [yarn]
yarn add rc-tiptap-editor
```

:::

## Usage

```tsx
import BaseKit from 'rc-tiptap-editor';

// Import CSS
import 'rc-tiptap-editor/style.css';

const extensions = [
  BaseKit.configure({
    // Show placeholder
    placeholder: {  // [!code highlight]
      showOnlyCurrent: true, // [!code highlight]
    },  // [!code highlight]

    // Character count
    characterCount: {  // [!code highlight]
      limit: 50_000,  // [!code highlight]
    },  // [!code highlight]
  }),
  ...
  // Import Extensions Here
];

const DEFAULT = '';

const App = () => {
  const [content, setContent] = useState(DEFAULT);

  const onChangeContent = (value: any) => {
    setContent(value);
  };

  return (
    <RcTiptapEditor
      output='html'
      content={content}
      onChangeContent={onChangeContent}
      extensions={extensions}
    />
  );
};
```

## Props

```ts
interface IPropsRcTiptapEditor {
  content: string;
  extensions: AnyExtension[];
  output: 'html' | 'json' | 'text';
  modelValue?: string | object;
  dark?: boolean;
  dense?: boolean;
  disabled?: boolean;
  label?: string;
  hideToolbar?: boolean;
  disableBubble?: boolean;
  hideBubble?: boolean;
  removeDefaultWrapper?: boolean;
  maxWidth?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
  editorClass?: string | string[] | Record<string, any>;
  contentClass?: string | string[] | Record<string, any>;
  onChangeContent?: (val: any) => void;
  useEditorOptions?: UseEditorOptions;
}
```
