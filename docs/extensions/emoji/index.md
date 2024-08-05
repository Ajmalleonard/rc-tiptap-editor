---
description: Emoji

next:
  text: History
  link: /extensions/history/index.md
---

## Usage

```tsx
import BaseKit, { Emoji } from 'rc-tiptap-editor'; // [!code ++]

const extensions = [
  ...,
  // Import Extensions Here
  Emoji.configure({ // [!code ++]
    enableEmoticons: true, // [!code ++]
  }), // [!code ++]
];

```
