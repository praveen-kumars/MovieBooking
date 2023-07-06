package com.moviebooking.payload.response;

import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class MovieResponse {
	
private String movieName;
	
	private String ticketsAllocated;


	private Set<String> theatres;
	
	public MovieResponse(String movieName, String ticketsAllocated, Set<String> theatres, int movieId) {
		super();
		this.movieName = movieName;
		this.ticketsAllocated = ticketsAllocated;
		this.theatres = theatres;
		this.movieId = movieId;
	}

	public MovieResponse() {
		// TODO Auto-generated constructor stub
	}

	public String getMovieName() {
		return movieName;
	}

	public void setMovieName(String movieName) {
		this.movieName = movieName;
	}

	public String getTicketsAllocated() {
		return ticketsAllocated;
	}

	public void setTicketsAllocated(String ticketsAllocated) {
		this.ticketsAllocated = ticketsAllocated;
	}

	public Set<String> getTheatres() {
		return theatres;
	}

	public void setTheatres(Set<String> theatres) {
		this.theatres = theatres;
	}

	public int getMovieId() {
		return movieId;
	}

	public void setMovieId(int movieId) {
		this.movieId = movieId;
	}

	private int movieId;

}
