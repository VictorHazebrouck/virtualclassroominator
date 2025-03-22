import { useEffect, useRef } from "react";
import { init_app } from "~/game/main";

export default function Game()
{
    const div_ref = useRef<HTMLDivElement | null>(null);

    useEffect(() =>
    {
        (async () =>
        {
            if (!div_ref.current) return;

            await init_app(div_ref.current);
        })();
    }, [div_ref.current]);

    return (
        <div className="h-full w-full overflow-hidden absolute top-0 left-0" ref={div_ref}></div>
    );
}
