/* eslint-disable unicorn/no-null */
/* eslint-disable quotes */
import { useCallback, useState } from 'react';

import { createLowlight, common } from 'lowlight';
import RcTiptapEditor, {
  BaseKit,
  History,
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
  ColumnToolbar,
  FontFamily,
  CodeBlock,
  Table,
  Code,
  locale,
  Emoji,
  EmojiSuggesstion,
} from 'rc-tiptap-editor';

import 'rc-tiptap-editor/style.css';

const extensions = [
  BaseKit.configure({
    multiColumn: true,
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 50_000,
    },
  }),
  History,
  FormatPainter,
  Clear,
  FontFamily,
  Heading.configure({ spacer: true }),
  FontSize,
  Bold,
  Italic,
  Underline,
  Strike,
  MoreMark,
  Emoji.configure({
    enableEmoticons: true,
  }),
  EmojiSuggesstion,
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
        }, 500);
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
  Code,
  CodeBlock.configure({ lowlight: createLowlight(common) }),
  ColumnToolbar,
  Table,
];

const DEFAULT = `<h1 style="text-align: center">Rc Tiptap Editor</h1><p>A modern WYSIWYG rich text editor based on <a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://github.com/scrumpy/tiptap">tiptap</a> and <a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://ui.shadcn.com/">shadcn ui</a> for Reactjs</p><p></p><p style="text-align: center"></p><p style="text-align: center"><img height="auto" src="https://picsum.photos/1920/1080.webp?t=1" width="500"></p><p></p><div data-type="horizontalRule"><hr></div><h2>Demo</h2><p>👉<a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://rc-tiptap-editor.vercel.app/">Demo</a></p><h2>Features</h2><ul><li><p>Use <a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://ui.shadcn.com/">shadcn ui</a> components</p></li><li><p>Markdown support</p></li><li><p>TypeScript support</p></li><li><p>I18n support</p></li><li><p>React support</p></li><li><p>Slash Commands</p></li><li><p>Multi Column</p></li><li><p>TailwindCss</p></li><li><p>Support emoji</p></li></ul><h2>Installation</h2><pre><code>pnpm add rc-tiptap-editor</code></pre><p></p>`;

function debounce(func: any, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeout);
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function App() {
  const [content, setContent] = useState(DEFAULT);
  const [theme, setTheme] = useState('light');
  const [disable, setDisable] = useState(false);

  const onValueChange = useCallback(
    debounce((value: any) => {
      setContent(value);
    }, 300),
    [],
  );
  return (
    <div
      className='p-[24px] flex flex-col w-full max-w-screen-lg gap-[24px] mx-[auto] my-0'
      style={{
        maxWidth: 1024,
        margin: '40px auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginTop: '100px',
          marginBottom: 10,
        }}
      >
        <button onClick={() => locale.setLang('vi')}>Vietnamese</button>
        <button onClick={() => locale.setLang('en')}>English</button>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
        <button onClick={() => setDisable(!disable)}>{disable ? 'Editable' : 'Readonly'}</button>
      </div>

      <RcTiptapEditor
        output='html'
        content={content as any}
        onChangeContent={onValueChange}
        extensions={extensions}
        dark={theme === 'dark'}
        disabled={disable}
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
