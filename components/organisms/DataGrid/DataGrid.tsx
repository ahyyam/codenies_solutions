import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/molecules/Card';
import { Button } from '@/components/atoms/Button';
import { SearchBox } from '@/components/molecules/SearchBox';

export interface DataGridColumn<T> {
  key: keyof T | string;
  title: string;
  render?: (value: any, item: T, index: number) => ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface DataGridProps<T> {
  data: T[];
  columns: DataGridColumn<T>[];
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  emptyMessage?: string;
  className?: string;
  rowClassName?: (item: T, index: number) => string;
  onRowClick?: (item: T, index: number) => void;
  actions?: {
    label: string;
    onClick: (item: T, index: number) => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  }[];
}

function DataGrid<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  searchable = false,
  searchPlaceholder = 'Search...',
  onSearch,
  emptyMessage = 'No data available',
  className,
  rowClassName,
  onRowClick,
  actions = []
}: DataGridProps<T>) {
  const getValue = (item: T, key: string | keyof T): any => {
    if (typeof key === 'string' && key.includes('.')) {
      return key.split('.').reduce((obj, k) => obj?.[k], item);
    }
    return item[key as keyof T];
  };

  if (loading) {
    return (
      <Card className={cn('p-8', className)}>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn('overflow-hidden', className)}>
      {searchable && (
        <div className="p-4 border-b border-gray-200">
          <SearchBox
            placeholder={searchPlaceholder}
            onChange={onSearch}
            className="max-w-sm"
          />
        </div>
      )}
      
      {data.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          {emptyMessage}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    style={{ width: column.width }}
                  >
                    {column.title}
                  </th>
                ))}
                {actions.length > 0 && (
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={cn(
                    'hover:bg-gray-50 transition-colors',
                    onRowClick && 'cursor-pointer',
                    rowClassName?.(item, rowIndex)
                  )}
                  onClick={() => onRowClick?.(item, rowIndex)}
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-4 py-3 text-sm text-gray-900">
                      {column.render
                        ? column.render(getValue(item, column.key), item, rowIndex)
                        : getValue(item, column.key)
                      }
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="px-4 py-3 text-right text-sm">
                      <div className="flex items-center justify-end space-x-2">
                        {actions.map((action, actionIndex) => (
                          <Button
                            key={actionIndex}
                            size="sm"
                            variant={action.variant || 'outline'}
                            onClick={(e) => {
                              e.stopPropagation();
                              action.onClick(item, rowIndex);
                            }}
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

DataGrid.displayName = 'DataGrid';

export { DataGrid };