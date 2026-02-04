import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import GSWMILogo from "../assets/logo.svg"


type TabKey = "day1" | "day2" | "day3" | "total";
type SlotKey = "lunch" | "dinner";
type MealKey = "whiteRice" | "eba";

type SlotSelection = {
  meal: MealKey | null;
  qty: number; // 0..5
};

type DaySelection = Record<SlotKey, SlotSelection>;

const MAX_QTY = 5;

const MEALS: Record<
  MealKey,
  { label: string; price: number; shortLabel?: string }
> = {
  whiteRice: {
    label: "White rice, stew, fried plantain & chicken",
    shortLabel: "White rice, stew, fried plantain &...",
    price: 7500,
  },
  eba: {
    label: "Eba, egusi soup, beef & ponmo",
    price: 5000,
  },
};

const DAY_SLOTS: Record<TabKey, SlotKey[]> = {
  day1: ["lunch", "dinner"],
  day2: ["lunch", "dinner"],
  day3: ["lunch", "dinner"],
  total: [],
};

function formatNaira(n: number) {
  // UI-first formatting
  return `₦${n.toLocaleString("en-NG")}`;
}

export default function EventLanding() {
  const nav = useNavigate();

  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState<TabKey>("day1");

  // Per-day, per-slot selections (matches your screenshots: lunch + dinner rows on day 2/3)
  const [selections, setSelections] = useState<Record<
    Exclude<TabKey, "total">,
    DaySelection
  >>({
    day1: {
      lunch: { meal: null, qty: 0 },
      dinner: { meal: null, qty: 0 },
    },
    day2: {
      lunch: { meal: null, qty: 0 },
      dinner: { meal: null, qty: 0 },
    },
    day3: {
      lunch: { meal: null, qty: 0 },
      dinner: { meal: null, qty: 0 },
    },
  });

  const tabs = useMemo(
    () =>
      [
        { key: "day1", label: "Day 1" },
        { key: "day2", label: "Day 2" },
        { key: "day3", label: "Day 3" },
        { key: "total", label: "Total meal summary" },
      ] as const,
    []
  );

  const setMeal = (day: Exclude<TabKey, "total">, slot: SlotKey, meal: MealKey) =>
    setSelections((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: { ...prev[day][slot], meal },
      },
    }));

  const setQty = (day: Exclude<TabKey, "total">, slot: SlotKey, qty: number) =>
    setSelections((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: { ...prev[day][slot], qty: Math.max(0, Math.min(MAX_QTY, qty)) },
      },
    }));

  const computeLineTotal = (meal: MealKey | null, qty: number) => {
    if (!meal || qty <= 0) return 0;
    return MEALS[meal].price * qty;
  };

  const summaryRows = useMemo(() => {
    const rows: Array<{
      dayLabel: string;
      slotLabel: string;
      mealLabel: string;
      qty: number;
      price: number;
      total: number;
    }> = [];

    (["day1", "day2", "day3"] as const).forEach((d) => {
      (["lunch", "dinner"] as const).forEach((slot) => {
        const sel = selections[d][slot];
        const total = computeLineTotal(sel.meal, sel.qty);
        if (!sel.meal || sel.qty === 0) return; // show only chosen items in summary
        rows.push({
          dayLabel:
            d === "day1" ? "DAY 1" : d === "day2" ? "DAY 2" : "DAY 3",
          slotLabel: slot === "lunch" ? "Lunch" : "Dinner",
          mealLabel: MEALS[sel.meal].label,
          qty: sel.qty,
          price: MEALS[sel.meal].price,
          total,
        });
      });
    });

    return rows;
  }, [selections]);

  const grandTotal = useMemo(
    () => summaryRows.reduce((acc, r) => acc + r.total, 0),
    [summaryRows]
  );

 
  const daySlots = tab === "total" ? [] : DAY_SLOTS[tab];

  return (
    <div className="min-h-screen bg-[#EEF2F7] flex flex-col">
      {/* Top Nav */}
      <header className="bg-[#071E36] text-white">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* <div className="h-8 w-28 bg-white/10 rounded" / > */}
            <img src={GSWMILogo} className="h-8" />
            
          </div>

          <a
            href="#support"
            className="text-sm font-semibold underline underline-offset-4"
          >
            Contact support
          </a>
        </div>
      </header>

      {/* Announcement strip */}
      <div className="bg-[#DDEBFF]">
        <div className="mx-auto max-w-6xl px-6 py-3 text-center text-sm text-[#173A8A]">
          Announcement/ event notice/ general update banner in slow motion
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-10">
          {/* Event card */}
          <section className="bg-white rounded-2xl shadow-sm p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left image */}
              <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3]">
                <div className="h-full w-full bg-gradient-to-br from-purple-200 via-orange-200 to-blue-200" />
                {/* Replace with <img ... className="w-full h-full object-cover" /> */}
              </div>

              {/* Right content */}
              <div>
                <h1 className="text-5xl font-extrabold text-[#0B1B2E] leading-tight">
                  GSWMI June <br /> Retreat 2026
                </h1>

                <p className="mt-4 text-sm text-[#334155] leading-6 max-w-lg">
                  The GSWMI June Retreat 2026 is a divine gathering of believers,
                  a sacred time of refreshing, revelation, and renewal in the
                  Spirit. It is a moment where hearts are stirred, faith is
                  deepened, and destinies are aligned in God’s purpose. The
                  retreat creates an atmosphere c...
                  <span className="text-[#2E6BFF] font-semibold cursor-pointer">
                    {" "}
                    Read more
                  </span>
                </p>

                {/* Date */}
                <div className="mt-6 flex items-center gap-3 text-sm text-[#0B1B2E]">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF2FF]">
                    📅
                  </span>
                  <span className="font-semibold">5 Jun 2026 – 7 Jun 2026</span>
                </div>

                {/* Location + mini map */}
                <div className="mt-3 flex items-start gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF2FF]">
                    📍
                  </span>

                  <div className="flex-1">
                    <div className="text-sm font-semibold text-[#0B1B2E]">
                      Kajede, Oyo
                    </div>

                    <div className="mt-2 h-20 rounded-xl bg-gray-100 overflow-hidden">
                      <div className="h-full w-full bg-[linear-gradient(90deg,#E5E7EB,transparent)]" />
                      {/* Replace with embedded map later */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Meal Ticket Accordion */}
          <section className="mt-8">
            <div className="bg-white rounded-xl shadow-sm">
              {/* Accordion header */}
              <button
                onClick={() => setOpen((s) => !s)}
                className="w-full px-8 py-5 flex items-center gap-4 text-left"
              >
                <span
                  className={[
                    "text-[#2E6BFF] text-xl transition-transform",
                    open ? "rotate-180" : "rotate-0",
                  ].join(" ")}
                >
                  ⌄
                </span>
                <span className="text-[#2E6BFF] font-bold text-lg">
                  Meal ticket
                </span>
              </button>

              {/* Accordion body */}
              {open ? (
                <div className="px-8 pb-10">
                  {/* Tabs */}
                  <div className="border rounded-lg p-1 flex gap-1 w-full max-w-3xl">
                    {tabs.map((t) => {
                      const active = tab === t.key;
                      return (
                        <button
                          key={t.key}
                          onClick={() => setTab(t.key)}
                          className={[
                            "px-4 py-2 rounded-md text-sm font-semibold transition",
                            active
                              ? "bg-white shadow text-[#111827]"
                              : "text-[#667085] hover:bg-white/60",
                          ].join(" ")}
                        >
                          {t.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* DAY TABLES */}
                  {tab !== "total" ? (
                    <div className="mt-8">
                      {/* Header pill */}
                      <div className="rounded-full border bg-[#F8FAFC] px-6 py-3 grid grid-cols-12 text-xs font-semibold text-[#667085]">
                        <div className="col-span-2">Slot</div>
                        <div className="col-span-7">Meal option X Price</div>
                        <div className="col-span-3 text-right">
                          Quantity (Max. 5 packs)
                        </div>
                      </div>

                      {/* Rows: Lunch + Dinner */}
                      <div className="mt-4 bg-white rounded-2xl border border-[#EEF2F3] overflow-hidden">
                        {daySlots.map((slot, idx) => {
                          const slotLabel = slot === "lunch" ? "Lunch" : "Dinner";
                          const d = tab as Exclude<TabKey, "total">;
                          const sel = selections[d][slot];

                          return (
                            <div
                              key={slot}
                              className={[
                                "grid grid-cols-12 items-start px-6 py-6",
                                idx === 0 ? "" : "border-t",
                              ].join(" ")}
                            >
                              {/* Slot */}
                              <div className="col-span-2 text-sm font-medium text-[#111827] pt-2">
                                {slotLabel}
                              </div>

                              {/* Meal options + price column */}
                              <div className="col-span-7">
                                <label className="flex items-center gap-3 py-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name={`${tab}-${slot}`}
                                    checked={sel.meal === "whiteRice"}
                                    onChange={() => setMeal(d, slot, "whiteRice")}
                                    className="h-4 w-4"
                                  />
                                  <span className="text-sm text-[#111827]">
                                    {MEALS.whiteRice.shortLabel}
                                  </span>
                                  <span className="ml-auto text-sm font-semibold text-[#667085]">
                                    {formatNaira(MEALS.whiteRice.price)}
                                  </span>
                                </label>

                                <label className="flex items-center gap-3 py-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name={`${tab}-${slot}`}
                                    checked={sel.meal === "eba"}
                                    onChange={() => setMeal(d, slot, "eba")}
                                    className="h-4 w-4"
                                  />
                                  <span className="text-sm text-[#111827]">
                                    {MEALS.eba.label}
                                  </span>
                                  <span className="ml-auto text-sm font-semibold text-[#667085]">
                                    {formatNaira(MEALS.eba.price)}
                                  </span>
                                </label>
                              </div>

                              {/* Quantity stepper */}
                              <div className="col-span-3 flex justify-end pt-1">
                                <div className="flex items-center gap-3 border rounded-full px-3 py-2 bg-white">
                                  <button
                                    onClick={() => setQty(d, slot, sel.qty - 1)}
                                    className="h-8 w-8 rounded-full border text-[#98A2B3] hover:bg-[#F8FAFC] disabled:opacity-50"
                                    disabled={sel.qty === 0}
                                    aria-label="decrease quantity"
                                  >
                                    –
                                  </button>

                                  <div className="w-8 text-center text-sm font-semibold text-[#667085]">
                                    {sel.qty}
                                  </div>

                                  <button
                                    onClick={() => setQty(d, slot, sel.qty + 1)}
                                    className="h-8 w-8 rounded-full border text-[#2E6BFF] hover:bg-[#EEF2FF] disabled:opacity-50"
                                    disabled={sel.qty === MAX_QTY}
                                    aria-label="increase quantity"
                                  >
                                    +
                                  </button>

                                  <div className="text-sm text-[#667085]">
                                    packs
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    /* TOTAL MEAL SUMMARY */
                    <div className="mt-8">
                      <div className="rounded-full border bg-[#F8FAFC] px-6 py-3 grid grid-cols-12 text-xs font-semibold text-[#667085]">
                        <div className="col-span-2">Day X Slot</div>
                        <div className="col-span-5">Meal option</div>
                        <div className="col-span-1 text-center">Qty</div>
                        <div className="col-span-2 text-right">
                          Price per meal
                        </div>
                        <div className="col-span-2 text-right">Total amount</div>
                      </div>

                      <div className="mt-4 bg-white rounded-2xl border border-[#EEF2F3] overflow-hidden">
                        {summaryRows.length === 0 ? (
                          <div className="px-8 py-14 text-center text-sm text-[#98A2B3]">
                            No meals selected yet. Select meals in Day 1–3 to see
                            your total summary.
                          </div>
                        ) : (
                          <div className="px-6 py-6">
                            {(["DAY 1", "DAY 2", "DAY 3"] as const).map((day) => {
                              const dayRows = summaryRows.filter(
                                (r) => r.dayLabel === day
                              );
                              if (dayRows.length === 0) return null;

                              return (
                                <div
                                  key={day}
                                  className="border-b last:border-b-0 pb-5 last:pb-0 mb-5 last:mb-0"
                                >
                                  <div className="text-[#2E6BFF] text-xs font-extrabold mb-4">
                                    {day}
                                  </div>

                                  {dayRows.map((r, i) => (
                                    <div
                                      key={`${day}-${i}`}
                                      className="grid grid-cols-12 text-sm text-[#111827] py-2"
                                    >
                                      <div className="col-span-2 font-medium">
                                        {r.slotLabel}
                                      </div>
                                      <div className="col-span-5 text-[#334155]">
                                        {r.mealLabel.length > 34
                                          ? r.mealLabel.slice(0, 33) + "..."
                                          : r.mealLabel}
                                      </div>
                                      <div className="col-span-1 text-center">
                                        {r.qty}
                                      </div>
                                      <div className="col-span-2 text-right font-semibold">
                                        {formatNaira(r.price)}
                                      </div>
                                      <div className="col-span-2 text-right font-semibold">
                                        {formatNaira(r.total)}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Total row */}
                      <div className="mt-8 bg-white rounded-xl shadow-sm px-8 py-6 flex items-center justify-between">
                        <div className="text-lg font-semibold text-[#0B1B2E]">
                          Total
                        </div>
                        <div className="text-lg font-extrabold text-[#0B1B2E]">
                          {formatNaira(grandTotal)}
                        </div>
                      </div>

                      {/* CTA */}
                      <button
                        onClick={() => nav("/register")}
                        disabled={grandTotal === 0}
                        className={[
                          "mt-4 w-full font-semibold py-3 rounded-lg flex items-center justify-center gap-2",
                          grandTotal === 0
                            ? "bg-[#F2F2F2] text-[#98A2B3] cursor-not-allowed"
                            : "bg-[#2E6BFF] hover:bg-[#255BE0] text-white",
                        ].join(" ")}
                      >
                        Register &amp; make payment <span>↗</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#E5EAF1] py-4 text-center text-sm text-[#667085]">
        © GSWMI Logistics Team
      </footer>
    </div>
  );
}