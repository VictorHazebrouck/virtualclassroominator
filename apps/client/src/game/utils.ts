import { type Application } from "pixi.js";

export function sync_app_size_to(app: Application, element: any)
{
    function on_resize()
    {
        app.renderer.resize(element.clientWidth, element.clientHeight);
    }

    const observer = new ResizeObserver(on_resize);
    observer.observe(element);

    return () => observer.disconnect();
}

const TickerSlow = {
    listeners: [] as (() => void)[],
    add(fn: () => void)
    {
        this.listeners.push(fn);
    },
    next()
    {
        this.listeners.forEach((cb) => cb());
        setTimeout(() => this.next(), 333);
    },
};
TickerSlow.next();

export { TickerSlow };
