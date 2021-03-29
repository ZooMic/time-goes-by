export const addZero = (number) => {
    const s = '' + number;
    if (s.length === 1) {
        return `0${s}`;
    }
    return s;
};

export const getCurrentDate = () => {
    const d = new Date();
    return `${d.getFullYear()}-${addZero(d.getMonth())}-${addZero(d.getDate())}`;
};

export const getCurrentHour = () => {
    const d = new Date();
    return `${addZero(d.getHours())}-${addZero(d.getMinutes())}-${addZero(d.getSeconds())}`;
};

export const formatTime = (sec) => {
    const hours = Math.floor(sec / (60 * 60));
    const rest = sec - hours * 60 * 60;
    const minutes = Math.floor(rest / 60);
    const seconds = rest - minutes * 60;

    let result = '';
    result += hours !== 0 ? `${hours} h ` : '';
    result += (hours !== 0 || minutes !== 0) ? `${minutes} min ` : '';
    result += `${seconds} sec`;

    return result;
}