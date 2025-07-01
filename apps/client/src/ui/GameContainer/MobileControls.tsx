import { BiDownArrow, BiLeftArrow, BiRightArrow, BiUpArrow } from "react-icons/bi";

export default function MobileControls()
{
    return <></>;
    return (
        <div className="absolute bottom-3 left-3 grid h-[20vh] w-[20vh] grid-cols-3 grid-rows-3 text-white">
            <br />
            <div className="flex items-center justify-center rounded-md bg-black opacity-70">
                <BiUpArrow />
            </div>
            <br />
            <div className="flex items-center justify-center rounded-md bg-black opacity-70">
                <BiLeftArrow />
            </div>
            <br />
            <div className="flex items-center justify-center rounded-md bg-black opacity-70">
                <BiRightArrow />
            </div>
            <br />
            <div className="flex items-center justify-center rounded-md bg-black opacity-70">
                <BiDownArrow />
            </div>
            <br />
        </div>
    );
}
