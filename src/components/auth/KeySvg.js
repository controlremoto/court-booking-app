import * as React from "react";

export default function KeySvg(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={22}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7.5 10A2.5 2.5 0 1 1 12.5 10a2.5 2.5 0 0 1-5 0Zm10.5 0a8 8 0 1 0-7.5 7.95V21a1 1 0 0 0 2 0v-3.05A8.001 8.001 0 0 0 18 10Z"
      />
    </svg>
  );
}
