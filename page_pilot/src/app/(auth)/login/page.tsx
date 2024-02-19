import { libre, mont } from "@/components/ui/Fonts";
import { Icons } from "@/components/Icons";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full min-w-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div>this is where the navbar goes</div>
      <div className="border-2 p-2 rounded-md shadow-xl w-full flex flex-col items-center max-w-md space-y-8">
        <div className="flex flex-col justify-center items-center border border-black w-5/6 lg:w-2/3 mx-auto py-2 px-4">
          <h1
            style={libre.style}
            className="text-3xl text-emerald-700 underline decoration-emerald-700 transition-colors hover:text-emerald-800 hover:decoration-emerald-800">
            PagePilot
          </h1>
          <p style={mont.style}>Your Ultimate Book Companion</p>
        </div>
        <div className="flex flex-col items-center gap-8">
          <Icons.PagePilotLogo className="h-12 w-auto text-black" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
      </div>
    </div>
  );
}
