export interface IEvent {
    creation: string;
    date: Date;
    enclos?: string;
    espece?: string;
    animal: string | string[];
    type: string;
    observations?: string;
}
