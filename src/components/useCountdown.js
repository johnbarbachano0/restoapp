import { useState, useEffect } from "react";

export default function useCountdown(value) {
  const [countdown, setCountdown] = useState(value);

  useEffect(() => {
    const timerOut = setTimeout(() => setCountdown(countdown - 1), 1000);
    countdown === 0 && clearTimeout(timerOut);
    return () => clearTimeout(timerOut);
  });

  return { countdown, setCountdown };
}
