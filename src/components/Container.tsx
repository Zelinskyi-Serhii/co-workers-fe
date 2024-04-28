import { FC, ReactNode } from "react";

export const Container: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="max-w-[1200px] mx-auto px-4 py-8 pb-[150px] md:pb-[100px]">
    {children}
  </div>
);
