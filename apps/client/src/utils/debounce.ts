export function debounced_fn(func: () => void, delay_ms: number)
{
    let timeout: NodeJS.Timeout;

    return () =>
    {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay_ms);
    };
}
