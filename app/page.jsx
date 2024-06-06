import Image from "next/image";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";
const Home = () => {
  return (
    <div className="flex h-full min-h-full flex-auto flex-col items-center justify-around lg:flex-row lg:items-center">
      <div className="flex basis-1/2 flex-col gap-10">
        <div className="text-nowrap rounded-full border-1 border-gray-700 px-2 py-2 text-center text-gray-400 dark:border-gray-600 md:px-0 lg:w-5/6">
          Nisi sit pariatur sunt laboris do.{" "}
          <Link href="/about" className="ml-2 text-blue-700">
            Read more <MdArrowRightAlt className="inline" />
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-gray-300">
          Cupidatat laboris ut adipisicing voluptate
        </h1>
        <p className="text-gray-400 lg:pr-20">
          Non deserunt irure incididunt nisi duis aliquip fugiat aliquip mollit
          qui occaecat non et. Ad consectetur non ad anim. Consectetur cillum
          aliquip nulla voluptate reprehenderit Lorem ad.
        </p>
        <div className="flex items-center justify-center gap-20 lg:justify-start">
          <Link
            href="/about"
            className="text-nowrap rounded-xl bg-primary px-4 py-2 font-semibold text-gray-200"
          >
            Learn More
          </Link>
          <Link
            href="/onlineApplication"
            className="text-nowrap rounded-xl bg-primary px-4 py-2 font-semibold text-gray-200"
          >
            Get Admission
          </Link>
        </div>
      </div>
      <div className="image-container relative hidden h-full basis-1/2 lg:block">
        <Image
          src="/hero.jpg"
          fill
          alt="hero"
          sizes="(min-width: 1200px) 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Home;
{
  /* <div className="basis-1/2 h-full relative hidden lg:block">
  <div className="lg:py-8 image-container">
    <Image src="/hero.jpg" fill alt="hero" className="object-cover" />
  </div>
</div>; */
}
