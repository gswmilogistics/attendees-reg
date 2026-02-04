import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PleaseWait() {
  const nav = useNavigate();

  // UI-first: auto move to success after 1.2s
  useEffect(() => {
    const t = setTimeout(() => nav("/registered"), 1200);
    return () => clearTimeout(t);
  }, [nav]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-2 w-2 rounded-full bg-black animate-pulse" />
        <div className="mt-10 text-2xl font-semibold text-[#0B1B2E]">
          Please wait
        </div>
        <div className="mt-2 text-sm text-[#667085]">
          You are now being taken to where to make your payment
        </div>
      </div>
    </div>
  );
}