import playerEnum from '../enums/player';
// [{event, timestamp}]
export const timelineSum = (timeline) => {
    let sum = 0;
    let last = null;
    let lastEvent = null;

    timeline.forEach(({ event, timestamp }) => {
        if (event === playerEnum['START'] || event === playerEnum['RESUME']) {
            last = timestamp;
        }

        if (event === playerEnum['PAUSE'] || (event === playerEnum['STOP'] && lastEvent !== playerEnum['PAUSE'])) {
            sum += timestamp - last;
        }
        
        lastEvent = event;
    });

    if (lastEvent === playerEnum['START'] || lastEvent === playerEnum['RESUME']) {
        sum += Date.now() - last;
    }

    return Math.floor(sum / 1000);
}