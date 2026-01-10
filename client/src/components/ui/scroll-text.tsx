// @ts-nocheck

'use client';

import React, { type JSX, useMemo, memo } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right';

// Reduced stagger for better performance
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05, // Reduced from 0.1 for faster animation
    },
  },
};

// Check if device prefers reduced motion or is mobile (for SSR safety, check at call time)
const shouldReduceAnimations = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
         window.innerWidth < 768;
};

const generateVariants = (
  direction: Direction
): { hidden: any; visible: any } => {
  const axis = direction === 'left' || direction === 'right' ? 'X' : 'Y';
  const value = direction === 'right' || direction === 'down' ? 30 : -30; // Reduced movement
  const skipBlur = shouldReduceAnimations();

  return {
    hidden: {
      filter: skipBlur ? 'none' : 'blur(4px)', // Reduced blur, skip on mobile
      opacity: 0,
      [`translate${axis}`]: value,
    },
    visible: {
      filter: 'none',
      opacity: 1,
      [`translate${axis}`]: 0,
      transition: {
        duration: skipBlur ? 0.15 : 0.25, // Faster transitions
        ease: 'easeOut',
      },
    },
  };
};

const defaultViewport = { amount: 0.3, margin: '0px 0px 0px 0px', once: true };

const TextAnimation = ({
  as = 'h1',
  text,
  classname = '',
  viewport = defaultViewport,
  variants,
  direction = 'down',
  letterAnime = false,
  lineAnime = false,
}: {
  text: string;
  classname?: string;
  as?: keyof JSX.IntrinsicElements;
  viewport?: {
    amount?: number;
    margin?: string;
    once?: boolean;
  };
  variants?: {
    hidden?: any;
    visible?: any;
  };
  direction?: Direction;
  letterAnime?: boolean;
  lineAnime?: boolean;
}) => {
  // Memoize variants to prevent re-creation
  const baseVariants = useMemo(() => variants || generateVariants(direction), [variants, direction]);
  const modifiedVariants = useMemo(() => ({
    hidden: baseVariants.hidden,
    visible: {
      ...baseVariants.visible,
    },
  }), [baseVariants]);

  // Memoize words split to prevent re-computation
  const words = useMemo(() => text.split(' '), [text]);

  const MotionComponent = motion[
    as as keyof typeof motion
  ] as React.ComponentType<HTMLMotionProps<any>>;

  // Ensure once: true is always set for performance
  const optimizedViewport = useMemo(() => ({
    ...viewport,
    once: true,
  }), [viewport]);

  return (
    <MotionComponent
      whileInView='visible'
      initial='hidden'
      variants={containerVariants}
      viewport={optimizedViewport}
      className={cn(
        `inline-block dark:text-white text-black uppercase`,
        classname
      )}
    >
      {lineAnime ? (
        <motion.span className={`inline-block`} variants={modifiedVariants}>
          {text}
        </motion.span>
      ) : (
        <>
          {text.split(' ').map((word: string, index: number) => (
            <motion.span
              key={index}
              className={`inline-block`}
              variants={letterAnime === false ? modifiedVariants : {}}
            >
              {letterAnime ? (
                <>
                  {word.split('').map((letter: string, letterIndex: number) => (
                    <motion.span
                      key={letterIndex}
                      className={`inline-block`}
                      variants={modifiedVariants}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  &nbsp;
                </>
              ) : (
                <>{word}&nbsp;</>
              )}
            </motion.span>
          ))}
        </>
      )}
    </MotionComponent>
  );
};

export default TextAnimation;
