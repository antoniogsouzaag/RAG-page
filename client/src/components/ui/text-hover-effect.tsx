import React from "react";

interface TextHoverEffectProps {
  text: string;
  className?: string;
}

export const TextHoverEffect: React.FC<TextHoverEffectProps> = ({ text, className }) => {
  return (
    <span
      className={
        "transition duration-300 ease-in-out hover:text-yellow-400 text-5xl font-bold " +
        (className || "")
      }
    >
      {text}
    </span>
  );
};
