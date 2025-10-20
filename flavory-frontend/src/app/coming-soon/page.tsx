"use client";
import { useEffect, useState } from "react";

interface CountdownItemProps {
  value: string;
  label: string;
}

const CountdownItem: React.FC<CountdownItemProps> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-3xl font-500 font-garamond tracking-tighter mb-1.5">
      {value}
    </span>
    <span className="uppercase font-600 text-xs tracking-wider text-primary">
      {label}
    </span>
  </div>
);

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState({
    weeks: "00",
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    // 🎯 Date cible : 1 décembre 2025 à minuit
    const targetDate = new Date("2025-12-01T00:00:00");

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({
          weeks: "00",
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const seconds = Math.floor((distance / 1000) % 60);
      const minutes = Math.floor((distance / 1000 / 60) % 60);
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(days / 7);

      setTimeLeft({
        weeks: String(weeks).padStart(2, "0"),
        days: String(days % 7).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countdownData = [
    { value: timeLeft.weeks, label: "WEEKS" },
    { value: timeLeft.days, label: "DAYS" },
    { value: timeLeft.hours, label: "HOURS" },
    { value: timeLeft.minutes, label: "MINUTES" },
    { value: timeLeft.seconds, label: "SECONDS" },
  ];

  return (
    <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-[52px] font-garamond mb-8 mt-16 tracking-tight">
        Coming soon
      </h2>

      <p className="max-w-[700px] text-base text-gray leading-relaxed mb-10">
        Notre site sera disponible le 1 décembre 2025. Restez connectés !
      </p>

      <div className="flex justify-center space-x-12 mb-20">
        {countdownData.map((item) => (
          <CountdownItem key={item.label} value={item.value} label={item.label} />
        ))}
      </div>
    </main>
  );
}