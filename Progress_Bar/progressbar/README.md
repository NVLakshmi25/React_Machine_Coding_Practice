🎯 Why translateX(animatedProgress - 100)?

When progress = 0 → translateX(-100%) → hidden

When progress = 100 → translateX(0%) → fully visible

----------------------------------------------------------------------------
👉 the percentage text NOT inside the green bar
👉 it should appear on the right side of the outer border
👉 like:

[███████████-----] 45%


instead of inside the bar.

// PROGRESSBAR.JSX  COMPONENT 
-----------------------------------------------------------------------------
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
    <div className="flex items-center gap-3 mt-3">
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
       </div>
      {/* overlay label always centered relative to .outer */}
      {/* <div className="progress-text"> */}
        <span className={`px-2 py-0.5 rounded text-sm font-semibold ${labelClass}`}>
          {progress}%
        </span>
      {/* </div> */}
   
    </div>
    
  );
};

export default ProgressBar;
----------------------------------------------------------------------------------------
INDEX.CSS

@import "tailwindcss";
@plugin "daisyui";

/* headline, container as before */
.headline {
  @apply text-lg text-center text-indigo-950 font-bold mb-5;
}
.progress-container {
  @apply flex flex-col items-center mt-5;
}

/* outer must be relative to position the overlay */
.outer {
  @apply w-[400px] h-6 border border-gray-400 rounded-lg overflow-hidden;
}

.inner {
  @apply bg-green-600 h-full transition-transform duration-500 ease-in;
}
/* overlay label always centered inside outer */
.progress-text {
  @apply absolute inset-0 flex items-center justify-center text-sm font-semibold z-10 pointer-events-none;
}

---------------------------------------------------------------------------------
























