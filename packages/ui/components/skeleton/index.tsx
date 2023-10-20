import React, { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import { cn } from '../../lib/utils';

const SkeletonAvatar: React.FC<SkeletonBaseProps> = ({ className }) => {
  return <div className={cn(`bg-emphasis me-3 mt-1 rounded-full`, className)} />;
};

type AsProp<T extends ElementType = ElementType> = {
  as: T;
} & ComponentPropsWithoutRef<ElementType>;

type SkeletonProps<T extends ElementType> = {
  loading?: boolean;
  children: ReactNode;
  waitForTranslation?: boolean;
  loadingClassName?: string;
} & Omit<AsProp<T>, 'children'>;

const Skeleton = <T extends ElementType>({
  as: Component,
  className = '',
  children,
  loading = false,
  /**
   * Assumes that the text needs translation by default and wait for it.
   */
  waitForTranslation = true,
  /**
   * Classes that you need only in loading state
   */
  loadingClassName = '',
  ...rest
}: SkeletonProps<T>) => {
  // loading = (waitForTranslation ? !isLocaleReady : false) || loading;

  return (
    <Component
      className={cn(
        loading
          ? cn(
              'font-size-0 bg-emphasis animate-pulse rounded-md text-transparent',
              loadingClassName
            )
          : '',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};

type SkeletonBaseProps = {
  className?: string;
};

const SkeletonText: React.FC<
  SkeletonBaseProps & { invisible?: boolean; style?: React.CSSProperties }
> = ({ className = '', invisible = false, style }) => {
  return (
    <span
      style={style}
      className={cn(
        `font-size-0 bg-emphasis inline-block animate-pulse rounded-md empty:before:inline-block empty:before:content-['']`,
        className,
        invisible ? 'invisible' : ''
      )}
    />
  );
};

const SkeletonButton: React.FC<SkeletonBaseProps> = ({ className }) => {
  return (
    <SkeletonContainer>
      <div className={cn(`bg-emphasis rounded-md`, className)} />
    </SkeletonContainer>
  );
};

interface SkeletonContainer {
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  className?: string;
}
const SkeletonContainer: React.FC<SkeletonContainer> = ({ children, as, className }) => {
  const Component = as || 'div';
  return <Component className={cn('animate-pulse', className)}>{children}</Component>;
};

export { Skeleton, SkeletonAvatar, SkeletonText, SkeletonButton, SkeletonContainer };
