import React, { useState, useEffect } from "react";
import { fromEvent, timer } from "rxjs";
import { takeUntil, repeat } from "rxjs/operators";
import css from "./timer.module.css";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [timeRef, setTimeRef] = useState(0);
  const [timerIsOn, setTimerIsOn] = useState(false);

  const reset$ = fromEvent(document.getElementById("resetBtn"), "click");

  const timeObserver = timer(0, 1000).pipe(takeUntil(reset$), repeat());

  useEffect(() => {
    if (timerIsOn && time > 0) {
      const subscription = timeObserver.subscribe((result) => {
        setTime(result + timeRef);
        setTimeRef(result + timeRef);
      });
      return () => subscription.unsubscribe();
    } else if (timerIsOn && time === 0) {
      const subscription = timeObserver.subscribe((result) => {
        setTime(result);
        setTimeRef(result);
      });
      return () => subscription.unsubscribe();
    }
  }, [timerIsOn]);

  const handleStart = () => {
    if (!timerIsOn) {
      setTimerIsOn(true);
    } else {
      setTimerIsOn(false);
      setTime(0);
    }
  };

  const handlePause = () => {
    setTimerIsOn(false);
  };

  const formatTime = () => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  return (
    <section className={css.stopwatch}>
      <div className={css.container}>
        <span className={css.stopwatchCounter}>{formatTime()}</span>
        <ul className={css.buttonsList}>
          <li>
            <button id="startBtn" onClick={handleStart}>
              {timerIsOn ? "Stop" : "Start"}
            </button>
          </li>
          <li>
            <button id="pauseBtn" onDoubleClick={handlePause}>
              Pause
            </button>
          </li>
          <li>
            <button id="resetBtn" disabled={time === 0 || !timerIsOn}>
              Reset
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Timer;
