import TiptapTable from '@tiptap/extension-table';
import type { TableRowOptions } from '@tiptap/extension-table-row';

import TableActionButton from '@/extensions/Table/components/TableActionButton';
import { GeneralOptions } from '@/types';

import { TableCell } from './cell';
import type { TableCellOptions } from './cell';
import { TableCellBackground } from './cell-background';
import type { TableCellBackgroundOptions } from './cell-background';
import type { TableHeaderOptions } from './header';
import TableHeader from './header';
import TableRow from './row';

export interface TableOptions extends GeneralOptions<TableOptions> {
  HTMLAttributes: Record<string, any>;
  resizable: boolean;
  handleWidth: number;
  cellMinWidth: number;
  lastColumnResizable: boolean;
  allowTableNodeSelection: boolean;
  /** options for table rows */
  tableRow: Partial<TableRowOptions>;
  /** options for table headers */
  tableHeader: Partial<TableHeaderOptions>;
  /** options for table cells */
  tableCell: Partial<TableCellOptions>;
  /** options for table cell background */
  tableCellBackground: Partial<TableCellBackgroundOptions>;
}
export const Table = TiptapTable.extend<TableOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {},
      resizable: true,
      lastColumnResizable: true,
      allowTableNodeSelection: false,
      button: ({ editor, t }) => ({
        component: TableActionButton,
        componentProps: {
          disabled: editor.isActive('table') || false,
          icon: 'Table',
          tooltip: t('editor.table.tooltip'),
          editor,
        },
      }),
    };
  },
  addExtensions() {
    return [
      TableRow.configure(this.options.tableRow),
      TableHeader.configure(this.options.tableHeader),
      TableCell.configure(this.options.tableCell),
      TableCellBackground.configure(this.options.tableCellBackground),
    ];
  },
});

export default Table;
