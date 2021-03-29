import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectTimeline } from '../../reducers/currentSlice';
import { formatTime } from '../../helper/date';
import { timelineSum } from '../../helper/timeline';
import { clock } from './Clock.module.css';

function Clock () {
    const [tick, setTick] = useState(true);
    const [time, setTime] = useState(null);
    const timeline = useSelector(selectTimeline);

    useEffect(() => {
        setTime(timelineSum(timeline));
    }, [timeline, tick]);

    useEffect(() => {
        setTimeout(() => {
            setTick(!tick);
        }, 1000);
    }, [tick]);

    return (
        <div className={clock}>
            { time === null ? 'Rozpocznij...' : `Czas ${formatTime(time)}` }
        </div>
    );
}

export default Clock;