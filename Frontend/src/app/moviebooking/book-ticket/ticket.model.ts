export class Ticket{
    private userName:string;
    private movieName:string;
    private theatreName:string;
    private ticketCount:number;
    private seatNumber:number[];

    constructor(userName:string,movieName:string,theatreName:string,ticketCount:number,seatNumber:number[]){
        this.userName=userName;
        this.movieName=movieName;
        this.theatreName=theatreName;
        this.ticketCount=ticketCount;
        this.seatNumber=seatNumber;

    }
}