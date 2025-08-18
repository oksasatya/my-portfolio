"use client";
import { useState, useEffect } from "react";
import CountUp from "react-countup";
import { InView } from "react-intersection-observer";

interface CountType {
  number: number;
  text?: string;
  add_style?: boolean;
}

const Count = ({ number, text, add_style }: CountType) => {
  const [focus, setFocus] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Pastikan hanya render di client side
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Return early jika masih di server side
  if (!isClient) {
    return <span>{number}</span>;
  }
  
  return (
    <InView
      as="div"
      onChange={(inView: boolean) => {
        if (inView && !focus) {
          setFocus(true);
        }
      }}
      threshold={0.3} // Trigger saat 30% visible
      triggerOnce={true} // Hanya trigger sekali
    >
      <div className={`d-inline ${add_style ? "align-items-center justify-content-center" : ""}`}>
        {focus ? (
          <CountUp
            start={0}
            end={number}
            duration={2.5}
            useEasing={true}
            preserveValue={true}
          />
        ) : (
          <span>0</span>
        )}
        {text && <span>{text}</span>}
      </div>
    </InView>
  );
};

export default Count;
