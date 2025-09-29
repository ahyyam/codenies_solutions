declare module 'jest-axe' {
  export function axe(container: Element, options?: any): Promise<any>
  export function toHaveNoViolations(): any
  export const configureAxe: (options: any) => any
}