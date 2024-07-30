/* eslint-disable unicorn/no-null */
/* eslint-disable quotes */
import { useState } from 'react';

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
  // Fullscreen,
  CodeBlock,
  Table,
  Code,
  // ImportWord,
  // ExportWord,
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
  // Fullscreen.configure({ spacer: true }),
  CodeBlock.configure({ lowlight: createLowlight(common) }),
  Table,
  Code,
  // ImportWord.configure({
  //   upload: (files: File[]) => {
  //     console.log('files', files);
  //     const f = files.map((file) => ({
  //       src: URL.createObjectURL(file),
  //       alt: file.name,
  //     }));
  //     return Promise.resolve(f);
  //   },
  // }),
  // ExportWord,
];

const DEFAULT = `<h1 style="text-align: center">Rc Tiptap Editor</h1><p>A modern WYSIWYG rich text editor based on <a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://github.com/scrumpy/tiptap">tiptap</a> and <a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://www.shadcn-vue.com/">shadcn ui</a> for Reactjs</p><p></p><p style="text-align: center"></p><p style="text-align: center"><img height="auto" src="https://picsum.photos/1920/1080.webp?t=1" width="500"></p><p></p><div data-type="horizontalRule"><hr></div><h2>Demo</h2><p>👉<a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://rc-tiptap-editor.vercel.app/">Demo</a></p><h2>Features</h2><ul><li><p>Use <a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://www.shadcn-vue.com/">shadcn ui</a> components</p></li><li><p>Markdown support</p></li><li><p>TypeScript support</p></li><li><p>I18n support</p></li><li><p>React support</p></li><li><p>Slash Commands</p></li><li><p>Multi Column</p></li><li><p>TailwindCss</p></li></ul><h2>Installation</h2><pre><code>pnpm add rc-tiptap-editor</code></pre><p></p>`;

function App() {
  const [content, setContent] = useState(DEFAULT);

  const onValueChange = (value: any) => {
    setContent(value);
  };

  return (
    <div
      className='p-[24px] flex flex-col w-full max-w-screen-lg gap-[24px] mx-[auto] my-0'
      style={{
        maxWidth: 1024,
        margin: '40px auto',
      }}
    >
      <RcTiptapEditor
        output='html'
        content={content as any}
        onChange={onValueChange}
        extensions={extensions}
      />

      {typeof content === 'string' && (
        <textarea
          style={{
            marginTop: 20,
            height: 500,
          }}
          value={content}
        />
      )}
    </div>
  );
}

export default App;
