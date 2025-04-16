const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_WEEK = ONE_DAY * 7;

export function get_display_date_from_uuidv7(uuidv7: string)
{
    const date = get_date_from_uuidv7(uuidv7);
    if (!date) return "unknown";

    const { timestamp, day, month, year } = date;
    const now_timestamp = new Date().getTime();
    const x_ms_ago = now_timestamp - timestamp;

    if (x_ms_ago < ONE_MINUTE * 2) return "just now";
    else if (x_ms_ago < ONE_MINUTE * 2) return "1 minute ago";
    else if (x_ms_ago < ONE_HOUR) return `${Math.floor(x_ms_ago / ONE_MINUTE)} minutes ago`;
    else if (x_ms_ago < ONE_HOUR * 2) return `1 hour ago`;
    else if (x_ms_ago < ONE_DAY) return `${Math.floor(x_ms_ago / ONE_HOUR)} hours ago`;
    else if (x_ms_ago < ONE_DAY * 2) return `1 day ago`;
    else if (x_ms_ago < ONE_WEEK) return `${Math.floor(x_ms_ago / ONE_DAY)} days ago`;
    else if (x_ms_ago < ONE_WEEK * 2) return `1 week ago`;
    else return `${year}/${month}/${day}`;
}

function get_date_from_uuidv7(uuidv7: string)
{
    try
    {
        const timestamp_str = uuidv7.replace("-", "").substring(0, 12);
        const timestamp = parseInt(timestamp_str, 16);
        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return {
            year,
            month,
            day,
            hours,
            minutes,
            timestamp,
        };
    }
    catch (e)
    {
        console.error("error parsing uuidv7 as date", e);
    }
}
