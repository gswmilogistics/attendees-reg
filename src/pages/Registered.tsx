

export default function Registered() {
  return (
    <div className="min-h-screen bg-[#EEF2F7] flex flex-col">
      <header className="bg-[#071E36] text-white">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="h-8 w-28 bg-white/10 rounded" />
          <a className="text-sm font-semibold underline underline-offset-4" href="#support">
            Contact support
          </a>
        </div>
      </header>

      <div className="bg-[#DDEBFF]">
        <div className="mx-auto max-w-6xl px-6 py-3 text-center text-sm text-[#173A8A]">
          Announcement/ event notice/ general update banner in slow motion
        </div>
      </div>

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="bg-white rounded-2xl shadow-sm p-10">
            <div className="flex flex-col items-center text-center py-10">
              <div className="h-24 w-24 rounded-full bg-[#F2F6FF]" />
              {/* replace with confetti svg */}

              <h2 className="mt-6 text-2xl font-extrabold text-[#0B1B2E]">
                Registered!
              </h2>

              <p className="mt-2 text-sm text-[#667085]">
                Yay! We can’t wait to have you at {"{event}"}.
              </p>

              <p className="mt-4 text-sm text-[#667085] max-w-lg">
                A copy of your tickets have been sent to your email. You can also
                download your ticket here directly.
              </p>

              <button className="mt-6 w-full max-w-xl bg-[#2E6BFF] hover:bg-[#255BE0] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
                Download ticket <span>↓</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#E5EAF1] py-4 text-center text-sm text-[#667085]">
        © GSWMI Logistics Team
      </footer>
    </div>
  );
}