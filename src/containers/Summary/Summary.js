import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectDay } from '../../reducers/dataSlice';
import { selectProjects } from '../../reducers/metaSlice';
import { timelineSum } from '../../helper/timeline';
import { formatTime } from '../../helper/date';

import { alignRight, summaryBlock } from './Summary.module.css';

function Summary () {
    const [summary, setSummary] = useState(null);
    const day = useSelector(selectDay());
    const projects = useSelector(selectProjects);

    useEffect(() => {
        if (day === undefined) {
            setSummary(null);
        } else {
            const keys = Object.keys(day);
            const newSummary = [];
            keys.forEach(key => {
                const name = projects[key].name;
                const time = day[key].map(timelineSum).reduce((a,b) => (a + b), 0);
                newSummary.push({ name, time });
            });
            newSummary.sort((a, b) => a.time < b.time ? 1 : -1);
            setSummary(newSummary);
        }
    }, [day, projects]);

    return (
        <div style={{padding: '10px'}}>
            <h2>Podsumowanie dnia:</h2>
            <div className={summaryBlock}>
                {summary === null ? 'Brak zarejestrowanych zdarzeń w tym dniu.' : ''}
                {summary !== null ? <table><tbody>{summary.map(({ name, time }, id) => <tr key={`summary-tr${id}`}><td className={alignRight}>{name}:</td><td className={alignRight}>{formatTime(time)}</td></tr>)}</tbody></table> : ''}
                {summary !== null ? <div style={{marginTop: '10px', paddingTop: '10px', borderTop: '1px solid'}}>Razem: {formatTime(summary.map(({ time }) => time).reduce((a, b) => (a + b), 0))}</div> : null}
            </div>
        </div>
    );
}

export default Summary;