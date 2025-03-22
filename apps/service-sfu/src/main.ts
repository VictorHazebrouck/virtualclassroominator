//livekit stuff

const PORT = process.env.PORT;

if (!PORT)
{
    throw new Error("No PORT found");
}
