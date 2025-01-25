"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import catNone from "@/public/images/cat/none.png";
import catLeft from "@/public/images/cat/left.png";
import catRight from "@/public/images/cat/right.png";

export default function BongoCatTyping() {
  const [show, setShow] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [catImage, setCatImage] = useState(catNone);
  const [isPasted, setIsPasted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const targetText = "Life is a journey, enjoy the ride.";
  const isComplete = userInput === targetText;

  const handleFocus = () => {
    setShow(true);
  };

  const handleBlur = () => {
    setShow(false);
    if (startTime && !endTime) {
      handleRestart();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);

    if (value.length > 0 && !startTime) {
      setStartTime(Date.now());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      handleRestart();
    }
  };

  const handleRestart = () => {
    setUserInput("");
    setStartTime(null);
    setEndTime(null);
    setCurrentTime(0);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsPasted(true);
  
    const pastedText = e.clipboardData.getData('text');
  
    setUserInput(`${pastedText} HURRY AND DELETE ME!!`);
  };

  const calculateTime = () => {
    if (startTime && endTime) {
      return ((endTime - startTime) / 1000).toFixed(3);
    }
    if (startTime) {
      return ((Date.now() - startTime) / 1000).toFixed(3);
    }
    return "0.000";
  };

  useEffect(() => {
    let catInterval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    if (isComplete && startTime) {
      setEndTime(Date.now());
      setShow(false);

      catInterval = setInterval(() => {
        const randomCat = Math.random() < 0.5 ? catLeft : catRight;
        setCatImage(randomCat);
      }, 100);

      timeout = setTimeout(() => {
        clearInterval(catInterval);
        setCatImage(catNone);
        handleRestart();
      }, 7000);
    }

    return () => {
      clearInterval(catInterval);
      clearTimeout(timeout);
    };
  }, [userInput, isComplete, startTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTime && !endTime) {
      interval = setInterval(() => {
        setCurrentTime(Date.now() - startTime);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (userInput.length > 0 && !isComplete) {
      const randomCat = Math.random() < 0.5 ? catLeft : catRight;
      setCatImage(randomCat);

      timeout = setTimeout(() => {
        setCatImage(catNone);
      }, 30);
    } else {
      setCatImage(catNone);
    }

    return () => clearTimeout(timeout);
  }, [userInput, isComplete]);

  return (
    <>
      <div className="relative flex flex-col justify-start items-start gap-3 w-full">
        {/* Typing test */}
        <div
          className="border h-auto rounded-md w-full gap-3
        flex flex-col justify-start items-center text-center 
        p-[1rem] pb-[0.7rem] 
        sm:p-[2rem] sm:pb-[1.1rem]"
        >
          <div className="w-full flex flex-col justify-start items-center gap-3">
            <span
              className="text-xs sm:text-base text-start text-foreground/25
              w-full font-bold"
            >
              {isComplete ? (
                <span className="text-blue-500 font-medium text-xs sm:text-base flex gap-1">
                  Holy cow! Your time is{" "}
                  <p className="underline">{calculateTime()}</p> seconds
                </span>
              ) : (
                targetText.split("").map((char, index) => {
                  const isCorrect = userInput[index] === char;
                  const isTyped = index < userInput.length;
                  return (
                    <span
                      key={index}
                      className={`${
                        isTyped
                          ? isCorrect
                            ? "text-black"
                            : "text-red-500"
                          : "text-foreground/25"
                      }`}
                    >
                      {char}
                    </span>
                  );
                })
              )}
            </span>

            <Input
              ref={inputRef}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              onPaste={handlePaste}
              type="text"
              value={isComplete ? "Bongo cat applauds you." : userInput}
              onChange={handleInputChange}
              disabled={isComplete}
              className="!text-[13px] h-[3.7rem] shadow-none border-[3px] border-black
              focus-visible:ring-0 disabled:opacity-100 disabled:text-gray"
              placeholder="Start typing here..."
            />
          </div>
          <div
            className={`w-full flex justify-between items-center 
            transition-all duration-500 font-medium
              ${show ? "opacity-100" : "opacity-0"}
            `}
          >
            <div
              className={`flex justify-center items-center gap-[5px] font-mono`}
            >
              <div
                className="flex border rounded-sm justify-center items-center 
                px-[0.4rem] py-[0.1px] bg-gray-50 text-center cursor-pointer"
                onClick={handleRestart}
              >
                <p className="text-[12px] text-black">TAB</p>
              </div>

              <p className="text-[12px] text-black">-</p>
              <p className="text-[12px] text-black">restart</p>
            </div>
            <div>
              <p className="text-[12px] text-black font-mono">
                {isPasted ? "😏 " : ""}{(currentTime / 1000).toFixed(3)}s
              </p>
            </div>
          </div>
          <Image
            alt="Bongo Cat"
            width={100}
            height={100}
            className="-rotate-[0.3deg] absolute 
            w-[5rem] 
            top-[12px] right-[25px]
            sm:top-[28px] sm:right-[50px] sm:w-[100px]"
            src={catImage}
            priority
          />
        </div>
      </div>
    </>
  );
}
