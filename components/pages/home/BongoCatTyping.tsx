"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import catNone from "@/public/images/cat/none.png";
import catLeft from "@/public/images/cat/left.png";
import catRight from "@/public/images/cat/right.png";
import { Input } from "@/components/ui/input";
import Badge from "@/components/Badge";

export default function BongoCatTyping() {
  const [show, setShow] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [catImage, setCatImage] = useState(catNone);
  const [isPasted, setIsPasted] = useState(false);

  // Placeholder typing animation states
  const [placeholder, setPlaceholder] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeletingPlaceholder, setIsDeletingPlaceholder] = useState(false);

  const placeholderMessages = [
    "Start typing here...",
    "Life is a journey, enjoy the ride.",
    "Try to beat the clock!",
    "Bongo cat is watching...",
    "Give it your best shot!",
  ];

  useEffect(() => {
    const currentWord = placeholderMessages[wordIndex];
    const typingSpeed = isDeletingPlaceholder ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeletingPlaceholder) {
        setPlaceholder(currentWord.substring(0, placeholder.length + 1));
        if (placeholder === currentWord) {
          setTimeout(() => setIsDeletingPlaceholder(true), 2000);
        }
      } else {
        setPlaceholder(currentWord.substring(0, placeholder.length - 1));
        if (placeholder === "") {
          setIsDeletingPlaceholder(false);
          setWordIndex((prev) => (prev + 1) % placeholderMessages.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [placeholder, isDeletingPlaceholder, wordIndex]);

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

    const pastedText = e.clipboardData.getData("text");

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
      }, 100);
    } else {
      setCatImage(catNone);
    }

    return () => clearTimeout(timeout);
  }, [userInput, isComplete]);

  return (
    <div className="relative flex flex-col justify-start items-start gap-3 w-full">
      {/* Typing test */}
      <div
        className="border h-auto rounded-md w-full gap-3
        flex flex-col justify-start items-center text-center 
        p-4 pb-[0.7rem] 
        sm:p-8 sm:pb-[1.1rem]"
      >
        <div className="w-full flex flex-col justify-start items-center gap-3">
          <span
            className="text-xs sm:text-base text-start text-foreground/25
              w-full font-bold "
          >
            {isComplete ? (
              <span
                className="text-blue-500 font-medium text-xs sm:text-base flex gap-1
                transition-all duration-300"
              >
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
                    className={`transition-all duration-300 ${
                      isTyped
                        ? isCorrect
                          ? "text-foreground dark:text-foreground"
                          : "text-red-500"
                        : "text-foreground/25 dark:text-foreground/40"
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
            className="text-[13px]! h-[3.7rem] shadow-none border-[3px] border-black
              focus-visible:ring-0 disabled:opacity-100 disabled:text-gray"
            placeholder={placeholder}
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
            <Badge text="TAB" className="py-[0.1px] text-[12px] rounded-sm" />

            <p className="text-[12px] text-inherit">-</p>
            <p className="text-[12px] text-inherit">restart</p>
          </div>
          <div>
            <p className="text-[12px] text-inherit font-mono">
              {isPasted ? "😏 " : ""}
              {(currentTime / 1000).toFixed(3)}s
            </p>
          </div>
        </div>
        <Image
          alt="Bongo Cat"
          width={100}
          height={100}
          className="-rotate-[0.3deg] absolute 
            w-20 
            top-[12px] right-[25px]
            sm:top-[28px] sm:right-[50px] sm:w-[100px]
            dark:sm:top-[26px] dark:top-[10px]"
          src={catImage}
          priority
        />
      </div>
    </div>
  );
}
