import { FC } from "react";

type Props = {
  isOpen: boolean;
};

export const ArrowDown: FC<Props> = ({ isOpen }) => (
  <svg
    fill="#FFFFFF"
    height="15px"
    width="15px"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 511.93 511.93"
    xmlSpace="preserve"
    style={{
      transition: "transform 0.3s ease",
      transform: `rotate(${isOpen ? 180 : 0}deg)`,
      transformOrigin: "center center",
    }}
  >
    <g>
      <path
        d="M476.738,280.436c-4.16-4.16-10.88-4.16-15.04,0l-195.2,195.2V10.996c0-5.333-3.84-10.133-9.067-10.88
      c-6.613-0.96-12.267,4.16-12.267,10.56v464.96l-195.093-195.2c-4.267-4.053-10.987-3.947-15.04,0.213
      c-3.947,4.16-3.947,10.667,0,14.827L248.365,508.81c4.16,4.16,10.88,4.16,15.04,0l213.333-213.333
      C480.898,291.423,480.898,284.596,476.738,280.436z"
      />
    </g>
  </svg>
);
