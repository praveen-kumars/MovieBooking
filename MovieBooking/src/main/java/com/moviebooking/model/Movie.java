package com.moviebooking.model;

import java.util.List;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



@Document(collection = "movies")
public class Movie {
	

	
	@Id
	private String movieName;
	private List<Theatre> theatres;

	public Movie(String movieName,List<Theatre> theatres) {
		super();
		this.movieName = movieName;
		this.theatres = theatres;
		
	}


	public Movie() {
	}


	public String getMovieName() {
		return movieName;
	}

	public void setMovieName(String movieName) {
		this.movieName = movieName;
	}
	
	public List<Theatre> getTheatres() {
		return theatres;
	}

	public void setTheatres(List<Theatre> theatres) {
		this.theatres = theatres;
	}
	

}
