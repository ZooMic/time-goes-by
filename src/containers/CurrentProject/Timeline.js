import { useSelector } from 'react-redux';

import { selectTimeline } from '../../reducers/currentSlice';
import playerEnum from '../../enums/player';
import { timelineItem, timelineIcon } from './Timeline.module.css'; 

const EVENT = {
    [playerEnum['START']]:  { icon: 'pi pi-play', label: 'START' },
    [playerEnum['STOP']]:   { icon: 'pi pi-power-off', label: 'STOP' }, 
    [playerEnum['RESUME']]: { icon: 'pi pi-chevron-right', label: 'RESUME' },
    [playerEnum['PAUSE']]:  { icon: 'pi pi-pause', label: 'PAUSE' }
}

function Timeline () {
    const timeline = useSelector(selectTimeline);

    // timestamp, event
    const template = (option, id) => {
        const { event, timestamp } = option;
        const d = new Date(timestamp);
        const label = EVENT[event].label;
        const icon = EVENT[event].icon
        return (
            <div className={timelineItem} key={`timeline-options-${id}`}>
                <i className={`${icon} ${timelineIcon}`} title={label}></i>
                <span>{d.getHours()}:{d.getMinutes()}:{d.getSeconds()} {d.getDate()}.{d.getMonth() + 1}.{d.getFullYear()}</span>
            </div>
        );
    }

    return (
        <div style={{borderBottom: '1px solid black'}}>
            { timeline.map(template) }
        </div>
    );
}

export default Timeline;