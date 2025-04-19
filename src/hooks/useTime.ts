import React, { useCallback, useLayoutEffect, useState } from "react";
import { debounce } from "../utils/debounce";

export default function useTime() {
  const [time, setTime] = useState(0);
  const [hash, setHash] = useState(0);

  const [status, setStatus] = useState(0);

  const [group, setGroup] = useState({ startTime: 0, endTime: 0, nowTime: 0 });

  useLayoutEffect(() => {
    let timer: any;
    // 开启定时器
    if (time === 0) {
      setHash(
        new Date(
          new Date().getTime() +
            (new Date().getTimezoneOffset() / 60 + 8) * 3600 * 1000
        ).getTime()
      );
      !!timer && clearTimeout(timer);
    } else {
      timer = setTimeout(() => {
        setTime((time: any) => time - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [time]);

  const init = useCallback(() => {
    if (
      !!Number(group.endTime) &&
      !!Number(group.startTime) &&
      !!Number(group.nowTime)
    ) {
      const newTime = group.nowTime;
      // const newTime = new Date(new Date().getTime() + ((new Date().getTimezoneOffset() / 60) + 8) * 3600 * 1000).getTime()
      let timeNum = 0;
      if (!status) {
        timeNum = Math.floor(
          (Number(group.startTime) - Number(newTime)) / 1000
        );
        if (timeNum <= 0) {
          setHash(newTime);
        }
        setTime(timeNum);
      } else {
        timeNum = Math.floor((Number(group.endTime) - Number(newTime)) / 1000);
        if (timeNum <= 0) {
          setHash(newTime);
        }
        setTime(timeNum);
      }
    }
  }, [group, status]);

  useLayoutEffect(() => {
    init();
  }, [status, group]);

  return {
    status,
    time,
    hash,
    setStatus,
    setGroup,
  };
}
