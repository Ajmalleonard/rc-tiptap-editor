---
description: Multilple Column
---

## Usage

```tsx
import BaseKit, { ColumnToolbar } from 'rc-tiptap-editor'; // [!code ++]

const extensions = [
  BaseKit.configure({
    multiColumn: true, // [!code ++]
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 50_000,
    },
  }),
  ...,
  // Import Extensions Here
  ColumnToolbar,  // [!code ++]
];

```
