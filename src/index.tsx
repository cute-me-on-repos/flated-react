"use client";

import { ReactNode, ReactElement, FC } from "react";

// Type for the tuple where the first element is a React function component and the second is its props
type FlatedItem<T extends FC<any> = FC<any>> =
  | T
  | [T]
  | [T, (Parameters<T>[0] & { children: undefined }) | undefined];
export function makeFlatedItem<T extends (...args: any[]) => any>(
  component: T,
  props: Omit<Parameters<T>[0], "children"> | undefined = undefined
) {
  return [component, props] as FlatedItem<T>;
}
/**
 * Pretify renderer for react context/component hell
 */
export const Renderer = ({
  components,
  children,
}: {
  components: FlatedItem[];
  children?: ReactNode;
}) => {
  const renderProvider = (
    components: FlatedItem[],
    children: ReactNode
  ): ReactElement => {
    const [tuple, ...restComponent] = components;

    let Component;
    let componentProps = {};

    if (tuple) {
      if (Array.isArray(tuple)) {
        [Component, componentProps = {}] = tuple;
      } else {
        Component = tuple;
      }
      
      return (
        <Component {...componentProps}>
          {renderProvider(restComponent, children)}
        </Component>
      );
    }

    return <>{children}</>;
  };

  return renderProvider(components, children);
};
const FlatedReact = {
  Wrap: Renderer,
  Load: makeFlatedItem,
};
export default FlatedReact;
