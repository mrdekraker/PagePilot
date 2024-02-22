import { Icons } from "@/components/Icons";
import logo from "@/components/logo.svg";

interface pageProps {}

const page = async ({}) => {
  return (
    <div className="flex justify-center items-center h-screen flex-1">
      <div className="text-gr-7 opacity-20 flex flex-col justify-center items-center flex-1 px-2">
        {/* <h1 className="text-5xl font-bold text-gray-600">PagePilot!</h1> */}
        <span className="w-[45rem]">
          <Icons.PagePilotLogo className="w-12 text-gr-7" />
        </span>
      </div>
    </div>
  );
};

export default page;
