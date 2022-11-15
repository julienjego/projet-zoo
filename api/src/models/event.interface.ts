export interface IEvent {
    date: Date;
    enclos?: string;
    espece?: string;
    animal: string | string[];
    type: string;
    observations?: string;
}
