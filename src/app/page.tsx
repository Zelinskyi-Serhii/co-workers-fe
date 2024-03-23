import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image
        className="mx-auto"
        src={
          "https://www.shutterstock.com/image-photo/home-page-icon-concept-on-260nw-535751713.jpg"
        }
        width={600}
        height={400}
        alt="Home"
      />
    </div>
  );
}
