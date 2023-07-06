package com.moviebooking.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;



@Document(collection = "tickets")
public class Ticket {
	
	 @Transient
	    public static final String SEQUENCE_NAME = "tickets_sequence";
	
	@Id
	private long id;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

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

	public Long getTicketCount() {
		return ticketCount;
	}

	public void setTicketCount(Long ticketCount) {
		this.ticketCount = ticketCount;
	}

	public List<Integer> getSeatNumber() {
		return seatNumber;
	}

	public void setSeatNumber(List<Integer> seatNumber) {
		this.seatNumber = seatNumber;
	}
	

	public Ticket(String userName,String movieName, String theatreName,Long ticketCount, List<Integer> seatNumber) {
		super();
		this.userName=userName;
		this.movieName = movieName;
		this.theatreName = theatreName;
		this.ticketCount = ticketCount;
		this.seatNumber = seatNumber;
	}
	
	private String userName;


	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	private String movieName;
	
	@Indexed
	private String theatreName;
	
	private Long ticketCount;
	
	private List<Integer> seatNumber;
	
}
