import React from 'react';
import Icon from '../AppIcon';
import { cn } from '../../utils/cn';

const sizes = {
  sm: { button: 'h-10 rounded-lg pr-4', square: 'w-10 h-10 rounded-md', text: 'text-sm' },
  md: { button: 'h-12 rounded-xl pr-5', square: 'w-12 h-12 rounded-lg', text: 'text-base' },
  lg: { button: 'h-14 rounded-xl pr-6', square: 'w-14 h-14 rounded-lg', text: 'text-lg' },
};

const SlidingCTA = ({
  label,
  onClick,
  href,
  iconName = 'ArrowRight',
  size = 'lg',
  className,
}) => {
  const S = sizes[size] || sizes.lg;
  const Comp = href ? 'a' : 'button';
  const compProps = href ? { href } : { onClick };

  return (
    <Comp
      {...compProps}
      className={cn(
        'group relative inline-flex items-center border border-border bg-card cta-shadow overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring pl-0',
        S.button,
        className,
      )}
    >
      <span className="pointer-events-none absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />

      <span className={cn('relative z-10 flex items-center justify-center mr-4 bg-primary text-primary-foreground overflow-hidden', S.square)}>
        <Icon name={iconName} size={size === 'sm' ? 16 : size === 'md' ? 18 : 20} className="will-change-transform group-hover:animate-arrow-swap-in group-[&:not(:hover)]:animate-arrow-swap-out" />
      </span>

      <span className={cn('relative z-10 font-cta text-foreground overflow-hidden leading-none', S.text)}>
        <span className="block transition-transform duration-700 ease-out group-hover:-translate-y-full">{label}</span>
        <span className="absolute inset-0 block translate-y-full transition-transform duration-700 ease-out group-hover:translate-y-0">{label}</span>
      </span>
    </Comp>
  );
};

export default SlidingCTA;


