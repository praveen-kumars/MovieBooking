package com.moviebooking.payload.request;

public class TicketUpdatePayload {
	
	public TicketUpdatePayload(){
		
	}
	
	private String movieName;
	
	private String theatreName;

	private String ticketStatus;

	public String getMovieName() {
		return movieName;
	}

	public void setMovieName(String movieName) {
		this.movieName = movieName;
	}

	public String getTheatreName() {
		return theatreName;
	}

	public void setTheatreName(String theatreName) {
		this.theatreName = theatreName;
	}

	public String getTicketcount() {
		return ticketStatus;
	}

	public void setTicketcount(String ticketcount) {
		this.ticketStatus = ticketcount;
	}

	public TicketUpdatePayload(String movieName, String theatreName, String ticketcount) {
		super();
		this.movieName = movieName;
		this.theatreName = theatreName;
		this.ticketStatus = ticketcount;
	}

	@Override
	public String toString() {
		return "TicketUpdatePayload [movieName=" + movieName + ", theatreName=" + theatreName + ", ticketcount="
				+ ticketStatus + "]";
	}
	
	
}
