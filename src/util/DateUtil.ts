
export default function dateToElapsedTime(date: string): string {
    const diff = (new Date(Date.now())).getTime() - (new Date(date)).getTime();
    const minutes = diff / 1000 / 60;

    if (minutes < 1) {
        return "less than 1 minute ago"
    }

    if (minutes < 60) {
        return minutes.toFixed(0) + " minutes ago";
    }

    const hours = minutes / 60;
    if (hours < 24) {
        return hours.toFixed(0) + " hours ago";
    }

    const days = hours / 24;
    return days.toFixed(0) + " days ago";
}
