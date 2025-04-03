export function debounced_fn<T = undefined>(func: (a: T) => void, delay_ms: number)
{
    let timeout: NodeJS.Timeout;

    return (args: T) =>
    {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(args!), delay_ms);
    };
}
