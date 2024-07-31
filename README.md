# Rc Tiptap Editor

A modern WYSIWYG rich-text editor base on [tiptap](https://tiptap.dev) uses [shadcn](https://ui.shadcn.com/) components.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![](https://img.shields.io/npm/v/rc-tiptap-editor.svg?label=version)](https://www.npmjs.com/package/rc-tiptap-editor)

![App Screenshot](./screenshot/screenshot.png)

## Demo

[Demo](https://rc-tiptap-editor.vercel.app/)

## Features

- Use [shadcn](https://ui.shadcn.com/) components
- Markdown support
- TypeScript support
- I18n support(`en`)
- Create your own extensions
- Tailwind CSS support

## Installation

```bash
  npm install rc-tiptap-editor
  pnpm install rc-tiptap-editor
  yarn add rc-tiptap-editor
```

## Usage

```tsx
import { createLowlight, common } from 'lowlight';

import RcTiptapEditor, {
  BaseKit,
  History,
  Columns,
  FormatPainter,
  Clear,
  Heading,
  FontSize,
  Bold,
  Italic,
  Underline,
  Strike,
  MoreMark,
  Color,
  Highlight,
  BulletList,
  OrderedList,
  TextAlign,
  Indent,
  LineHeight,
  TaskList,
  Link,
  Image,
  ImageUpload,
  Video,
  VideoUpload,
  Blockquote,
  SlashCommand,
  HorizontalRule,
  CodeBlock,
  Table,
  Code,
} from 'rc-tiptap-editor';

import 'rc-tiptap-editor/style.css';

const extensions = [
  BaseKit.configure({
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 50_000,
    },
  }),
  History,
  Columns,
  FormatPainter,
  Clear,
  Heading.configure({ spacer: true }),
  FontSize,
  Bold,
  Italic,
  Underline,
  Strike,
  MoreMark,
  Color.configure({ spacer: true }),
  Highlight,
  BulletList,
  OrderedList,
  TextAlign.configure({ types: ['heading', 'paragraph'], spacer: true }),
  Indent,
  LineHeight,
  TaskList.configure({
    spacer: true,
    taskItem: {
      nested: true,
    },
  }),
  Link,
  Image,
  ImageUpload.configure({
    upload: (files: File) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files));
        }, 1000);
      });
    },
  }),
  Video,
  VideoUpload.configure({
    upload: (files: File[]) => {
      const f = files.map((file) => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }));
      return Promise.resolve(f);
    },
  }),
  Blockquote,
  SlashCommand,
  HorizontalRule,
  CodeBlock.configure({ lowlight: createLowlight(common) }),
  Table,
  Code,
];

const DEFAULT = '';

const App = () => {
  const [content, setContent] = useState(DEFAULT);

  const onValueChange = (value: any) => {
    setContent(value);
  };

  return (
    <RcTiptapEditor
      output='html'
      content={content as any}
      onChange={onValueChange}
      extensions={extensions}
    />
  );
};
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/hunghg255/rc-tiptap-editor.git
```

Go to the project directory

```bash
  cd rc-tiptap-editor
```

Install dependencies

```bash
  pnpm install
```

Start the Demo server

```bash
  npm run build:lib:dev
  npm run playground
```

## Related

Here are some related projects

[shadcn](https://ui.shadcn.com/)

[tiptap](https://tiptap.dev)

## License

[MIT](https://choosealicense.com/licenses/mit/)
