package com.moviebooking.model;

import java.util.List;

import org.springframework.data.mongodb.core.index.Indexed;

public class Theatre {
	
	@Indexed
	private String theatreName;
	
	private long totalTicket;
	
	private String ticketStatus;
	
	public String getTicketStatus() {
		return ticketStatus;
	}

	public void setTicketStatus(String ticketStatus) {
		this.ticketStatus = ticketStatus;
	}

	public Theatre(long totalTicket) {
		super();
		this.totalTicket = totalTicket;
	}
	
	public Theatre() {}

	private  List<Integer> seatNumber;

	public List<Integer> getSeatNumber() {
		return seatNumber;
	}


	public void setSeatNumber(List<Integer> seatNumbers) {
		this.seatNumber = seatNumbers;
	}




	public Theatre(String theatreName, long totalTicket,String ticketStatus, List<Integer> seatNumber) {
		super();
		this.theatreName = theatreName;
		this.totalTicket = totalTicket;
		this.ticketStatus=ticketStatus;
		this.seatNumber = seatNumber;
	}




	public Theatre(String string, int i) {
		// TODO Auto-generated constructor stub
		this.theatreName=string;
		this.totalTicket=i;
	}

	public String getTheatreName() {
		return theatreName;
	}

	public void setTheatreName(String theatreName) {
		this.theatreName = theatreName;
	}

	public long getTotalTicket() {
		return totalTicket;
	}

	public void setTotalTicket(long totalTicket) {
		this.totalTicket = totalTicket;
	}

	
	

}
