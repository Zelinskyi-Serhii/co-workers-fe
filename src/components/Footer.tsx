export const Footer = () => (
  <footer className="absolute bottom-4 left-[10px] right-[10px] flex flex-col md:flex-row justify-between md:h-[60px] bg-[#888] p-4 rounded-md opacity-70">
    <div className="flex items-center gap-4 md:order-none order-1 md:justify-normal">
      <span>Source code:</span>
      <div className="flex md:flex-col gap-[10px] md:gap-0 [&>a]:text-[#FFF]">
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

    <h1>
      Created by{" "}
      <a
        href="https://www.linkedin.com/in/serhii-zelinskyi-dev/"
        target="_blank"
        className="text-[#FFF]"
      >
        Serhii Zelinskyi
      </a>
    </h1>

    <a href="mailto:zelinskyi.serh@gmail.com" className="text text-end">
      zelinskyi.serh@gmail.com
    </a>
  </footer>
);
