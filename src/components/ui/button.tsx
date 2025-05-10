'use client';

import clsx from 'clsx';
import Link from 'next/link';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children?: React.ReactNode;
}

export default function Button({
  href,
  onClick,
  type = 'button',
  className,
  children
}: ButtonProps) {
  const commonStyles = clsx(
    'rounded-lg px-4 py-2 font-semibold transition hover:bg-opacity-80 cursor-pointer',
    className
  );

  if (href) {
    return (
      <Link href={href} className={commonStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type={type} className={commonStyles}>
      {children}
    </button>
  );
}
