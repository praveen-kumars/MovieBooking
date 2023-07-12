export interface theatres{
    theatreName:string,
    totalTicket:number,
    ticketStatus:string
    seatNumber:[],

}

export interface movie{
    movieName:string,
    theatres:theatres[],


}