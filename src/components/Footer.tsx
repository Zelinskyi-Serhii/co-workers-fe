export const Footer = () => (
  <footer className="absolute bottom-0 left-[10px] right-[10px] flex justify-between h-[60px] bg-[#888] p-4 rounded-md opacity-70">
    <div className="flex items-center gap-4">
      <span>Source code:</span>
      <div className="flex flex-col [&>a]:text-[#FFF]">
        <a
          href="https://github.com/Zelinskyi-Serhii/co-workers-be"
          target="_blank"
        >
          Backend
        </a>
        <a
          href="https://github.com/Zelinskyi-Serhii/co-workers-fe"
          target="_blank"
        >
          Frontend
        </a>
      </div>
    </div>
    <h1 className="text-center">
      Created by{" "}
      <a
        href="https://www.linkedin.com/in/serhii-zelinskyi-dev/"
        target="_blank"
        className="text-[#FFF]"
      >
        Serhii Zelinskyi
      </a>
    </h1>
    <a href="mailto:zelinskyi.serh@gmail.com" className="text">
      zelinskyi.serh@gmail.com
    </a>
  </footer>
);
