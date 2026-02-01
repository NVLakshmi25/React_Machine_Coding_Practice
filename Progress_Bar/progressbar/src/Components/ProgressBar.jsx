import React, { useEffect, useState } from "react";

const ProgressBar = ({ progress }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    // small delay for animation effect
    const timer = setTimeout(() => setAnimatedProgress(progress), 100);
    return () => clearTimeout(timer);
  }, [progress]);

  // decide label style for contrast (0% -> black text on white bg)
 const getLabelClass = (value) => {
  if (value === 0) return "text-black bg-white";

  if (value < 50) return "text-green-950 bg-white";

  return "text-black";
};

const labelClass = getLabelClass(progress);
  return (
    <div
      className="outer"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={progress}
    >
      {/* green fill: control width, animate width */}
      <div
        className="inner"
        style={{
        // this is not  very performented  way  when you do this  the  browser load  whole css repainting   again and again
        //   width: `${animatedProgress}%`,
        // width:${progress}%,
        // this is more performented way . it will give a smooth transition effect 
          transform: `translateX(${animatedProgress - 100}%)`,

        }}
      />
      {/* overlay label always centered relative to .outer */}
      <div className="progress-text">
        <span className={`px-2 py-0.5 rounded text-sm font-semibold ${labelClass}`}>
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;