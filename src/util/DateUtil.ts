
export default function dateToElapsedTime(date: string): string {
    const diff = (new Date(Date.now())).getTime() - (new Date(date)).getTime();
    const hours = diff / 1000 / 60 / 60;
    if (hours < 24) {
        return (diff / 1000 / 60 / 60).toFixed(0) + " hours ago";
    } else {
        const days = hours / 24;
        return days.toFixed(0) + " days ago";
    }
}
