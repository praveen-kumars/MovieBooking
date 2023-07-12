package com.moviebooking.payload.request;

import java.util.List;
import java.util.Set;

public class TicketRequest {
	
	private String userName;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	private String movieName;
	
	private String theatreName;
	
	private Long ticketCount;
	
	private List<Integer> seatNumber;

	public List<Integer> getSeatNumber() {
		return seatNumber;
	}

	public void setSeatNumber(List<Integer> seatNumber) {
		this.seatNumber = seatNumber;
	}

	public String getMovieName() {
		return movieName;
	}

	

	public TicketRequest(String userName,String  movieName, String theatreName,Long ticketCount, List<Integer> seatNumber) {
		super();
		this.userName=userName;
		this.movieName = movieName;
		this.theatreName = theatreName;
		this.ticketCount = ticketCount;
		this.seatNumber = seatNumber;
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

	public Long getTicketCount() {
		return ticketCount;
	}

	public void setTicketCount(Long ticketCount) {
		this.ticketCount = ticketCount;
	}


}
