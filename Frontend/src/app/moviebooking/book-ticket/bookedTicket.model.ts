export class bookedTicket{
    constructor(
        public id:number,
        public userName:string,
        public movieName:string,
        public theatreName:string,
        public ticketCount:number,
        public seatNumber:[]
    ){}
}