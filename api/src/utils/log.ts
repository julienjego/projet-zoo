import Event from "../models/event";

const logEvent = (
    enclos: string,
    espece: string,
    animal: string | string[],
    type: string,
    observations: string
) => {
    const event = new Event({
        date: Date.now(),
        enclos: enclos,
        espece: espece,
        animal: animal,
        type: type,
        observations: observations,
    });
    event.save();
};

export default { logEvent };
