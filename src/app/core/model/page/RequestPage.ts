import { Pageable } from "./Pageable";

export class PageRequest {
    pageable: Pageable;
    dateFinal: Date;
    dateIni: Date;
    gameId: number;
    clientId: number;
}