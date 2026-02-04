import  { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPayment() {
  const nav = useNavigate();
  const [gateway, setGateway] = useState<"paystack" | "flutterwave" | null>(null);
  const [consent, setConsent] = useState(false);

  const canCheckout = Boolean(gateway) && consent;

  return (
    <div className="min-h-screen bg-[#EEF2F7] flex flex-col">
      {/* Header strip kept same */}
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
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: form */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <button
                onClick={() => nav(-1)}
                className="text-sm font-semibold text-[#111827] flex items-center gap-2"
              >
                ← <span>Register &amp; make payment</span>
              </button>

              <div className="mt-6 space-y-5">
                <Field label="First name *" placeholder="First name" />
                <Field label="Last name *" placeholder="Last name" />
                <Field label="Email address *" placeholder="Email address" />
                <Field label="Phone number *" placeholder="Phone number" />

                <Field
                  label="Share any food allergies you may have. If you don’t have any food allergies, type “N/A” *"
                  placeholder="Type your answer"
                />

                <label className="flex gap-3 items-start text-sm text-[#344054]">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  <span>
                    I confirm that the information provided is accurate and I
                    consent to the use of my details for event coordination and
                    logistics purposes.
                  </span>
                </label>
              </div>
            </div>

            {/* Right: order summary */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="text-[#2E6BFF] font-semibold">Order summary</div>

              <div className="mt-6 flex items-center justify-between text-sm">
                <div className="text-[#111827] font-medium">Meal ticket</div>
                <div className="font-semibold">₦65,000</div>
              </div>

              <button className="mt-3 text-xs text-[#D4006A] font-semibold flex items-center gap-2">
                <span className="inline-block rotate-180">⌄</span> Show details
              </button>

              <div className="mt-6 bg-[#F2F6FF] rounded-xl px-4 py-3 flex items-center justify-between">
                <div className="font-semibold text-[#111827]">Grand total</div>
                <div className="font-extrabold text-[#111827]">₦65,000</div>
              </div>

              <div className="mt-10 text-sm text-[#667085]">
                Choose a payment gateway
              </div>

              <div className="mt-4 flex items-center gap-10">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="gateway"
                    checked={gateway === "paystack"}
                    onChange={() => setGateway("paystack")}
                  />
                  <div className="font-extrabold text-[#111827]">paystack</div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="gateway"
                    checked={gateway === "flutterwave"}
                    onChange={() => setGateway("flutterwave")}
                  />
                  <div className="font-extrabold text-[#111827]">flutterwave</div>
                </label>
              </div>

              <button
                disabled={!canCheckout}
                onClick={() => nav("/wait")}
                className={[
                  "mt-10 w-full rounded-lg py-3 font-semibold",
                  canCheckout
                    ? "bg-[#2E6BFF] text-white hover:bg-[#255BE0]"
                    : "bg-[#F2F2F2] text-[#98A2B3] cursor-not-allowed",
                ].join(" ")}
              >
                Checkout
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

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <div className="text-sm font-semibold text-[#344054] mb-2">{label}</div>
      <input
        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#2E6BFF]/30"
        placeholder={placeholder}
      />
    </div>
  );
}