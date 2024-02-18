import { libre, mont } from "@/components/ui/Fonts";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-full bg-gr-1">
      <div className="flex flex-col justify-center items-center border border-black py-2 px-4">
        <h1
          style={libre.style}
          className="text-3xl text-emerald-700 underline decoration-emerald-700 transition-colors hover:text-emerald-800 hover:decoration-emerald-800">
          PagePilot
        </h1>
        <p style={mont.style}>Your Ultimate Book Companion</p>
      </div>
    </div>
  );
}
