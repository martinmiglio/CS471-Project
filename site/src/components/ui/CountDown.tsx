"use client";

import { useState, useRef, useEffect } from "react";

function calculateTimeLeft(endTime: Date) {
  const difference = endTime.getTime() - new Date().getTime();
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: difference,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      total: difference,
    };
  }

  return timeLeft;
}

export default function CountDown({ endTime }: Readonly<{ endTime: Date }>) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime));
  const [isExpired, setIsExpired] = useState(false);
  const [onClient, setOnClient] = useState(false);
  const timer = useRef<NodeJS.Timeout>();
  const [isExpiring, setExpiring] = useState(false);

  useEffect(() => {
    timer.current = setInterval(() => {
      const timeLeft = calculateTimeLeft(endTime);
      if (timeLeft.total <= 0) {
        clearInterval(timer.current!);
        setIsExpired(true);
      }
      setTimeLeft(timeLeft);
    }, 1000);
    return () => clearInterval(timer.current!);
  }, [endTime]);

  useEffect(() => {
    setOnClient(true);
  }, []);

  useEffect(() => {
    if(timeLeft.minutes < 5 && timeLeft.days === 0 && timeLeft.hours === 0 )
      {setExpiring(true);}

  }, [timeLeft]);

  if (!onClient) {
    return <></>;
  }

  return (
    <div>
      {isExpired ? (
        <div className="text-destructive">Expired</div>
      ) : (
        <div className = {isExpiring? "text-destructive":""}>
          {timeLeft.days}d:{timeLeft.hours}h:{timeLeft.minutes}m:
          {timeLeft.seconds}s
        </div>
      )}
    </div>
  );
}
