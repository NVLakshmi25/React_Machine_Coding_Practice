
https://ui.shadcn.com/docs/components/radix/input-otp 

⚡ Optional NEXT-LEVEL FEATURES (you can add later)

🔥 Paste full OTP
🔥 Arrow key navigation
🔥 Auto submit when complete
🔥 Error animation
🔥 Shake on wrong OTP
🔥 Timer + resend
🔥 Disable after submit

🔹 Typing Logic

When user types:

1️⃣ Check numeric
2️⃣ Save only last digit
3️⃣ Update state
4️⃣ Move focus to next box.

🔹 Backspace Logic

If:

✔ current box empty
✔ user presses Backspace

👉 move focus to previous box.

// | Feature              | Done |
| -------------------- | ---- |
| Paste full OTP       | ✅    |
| Auto submit          | ✅    |
| Resend timer         | ✅    |
| Shake on wrong OTP   | ✅    |
| Disable after submit | ✅    |
| Feature                    | Status |
| -------------------------- | ------ |
| Clear inputs after success | ✅      |
| Show error                 | ✅      |
| Show success               | ✅      |
| Disable while checking     | ✅      |
| Submit button              | ✅      |
 
 // 👉 @apply ONLY works with Tailwind utility classes
👉 animate-scaleIn is your own custom CSS class, not a Tailwind utility.


🎯 Which approach should you use?

👉 For machine-coding / interviews → FIRST FIX is perfect
👉 For production design system → Tailwind config extension




import React, { useEffect, useRef, useState } from 'react'


// OTP INPUT -ONLY NUMBERS 
 const OTP_DIGITS_COUNT =6
const GenerateOTP = () => {
    const [inputArr, setInputArr] =useState (
        new Array(OTP_DIGITS_COUNT).fill("")
    );

const refArr=useRef([]);
useEffect(()=>{
  refArr.current[0]?.focus();  /// fous   on first input box and  visible cursor on first 
},[])


    const handleOnChange=(value, index)=>{
        if(isNaN(value)) return;
        console.log(value);

        const  newValue=value.trim();  //  if the (new value) must present in input after then move to
        // cursor next 
          const  newArr=[...inputArr];
        newArr[index]=newValue.slice(-1) ;
        setInputArr(newArr);
         newValue && refArr.current[index + 1]?.focus(); // focus on  each box another , it is automatically move to another box by using cursor 

    };

    const  handleOnKeyDown=(e,index)=>{
      // if pressing backspace which any input box  if is behave like randomly  it removes the 
      // previous input not current one removing

      if(!e.target.value && e.key ==='Backspace'){ 
      refArr.current[index-1]?.focus();   //(!e.target.value)  i only have to  change  this focus if my input is clear 
      // iwant to delete the current  box using  backspace 
      // if you want  to move previous box that  current  input box was empty.
      }
    }


  return (
    <div className='otp-container'>
        <div className='header text-center'>
        <h1 className='head'>validate OTP</h1>
        <div className='otp-genarator'>
        {inputArr.map((input, index) => {
  return (
    <input
      type="text"
      className="otp-input"
      key={index}
      value={inputArr[index]}
      ref={(input)=>(refArr.current[index]=input)} // only one input should  take for each box
      onChange={(e) => handleOnChange(e.target.value, index)}
      onKeyDown={(e)=>handleOnKeyDown(e,index)} // if pressing backspace which any input box 
    />
  );
})}
</div>
</div>
    </div>
  )
}

export default GenerateOTP;


-------------------------------------------- //tailwind css
.otp-genarator{
  @apply flex justify-center ;
}
.otp-input{
  @apply  h-[50px] w-[50px] text-2xl text-center m-1.5 border border-black ;
}
.head{
  @apply  text-2xl   font-bold mb-4 ;
}
.otp-container{
  @apply  flex min-h-screen items-center justify-center ;
}