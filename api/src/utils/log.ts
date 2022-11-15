import Event from "../models/event";

const logEvents = (
    enclos: String,
    espece: String,
    animal: String | String[],
    type: String,
    observations: String
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

export default { logEvents };
