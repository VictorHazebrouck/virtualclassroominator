import { PeerServer } from "peer";

const PORT = process.env.PORT;

if (!PORT)
{
    throw new Error("No PORT found");
}

PeerServer({ port: Number(PORT), path: "/" });

console.log(`service-p2p running on port ${PORT}`);
