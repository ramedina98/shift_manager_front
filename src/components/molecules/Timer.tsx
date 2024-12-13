import React, { useState, useEffect } from "react";
import Text from "../atoms/Text";

interface TimerProps {
    time: number; // Tiempo inicial en milisegundos
    classname?: string;
    onTimeEnd: () => void;
}

const Timer: React.FC<TimerProps> = ({ time, classname, onTimeEnd} ) => {
    const [timeLeft, setTimeLeft] = useState(time);

    useEffect(() => {

        if (timeLeft <= 0){
            onTimeEnd();
            return;
        };


        const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secondsLeft).padStart(2, "0")}`;
    };


    return (
        <div
            className={`${classname} rounded-md shadow-md text-center`}
        >
            <Text>{formatTime(timeLeft)}</Text>
        </div>
    );
}

export default Timer;