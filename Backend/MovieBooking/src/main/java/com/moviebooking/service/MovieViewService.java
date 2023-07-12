package com.moviebooking.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.moviebooking.model.Movie;
import com.moviebooking.model.Theatre;
import com.moviebooking.repository.MovieRepository;

@Service
public class MovieViewService {
	
	@Autowired
	MovieRepository movieRepository;

	@Autowired
	MongoTemplate mongoTemplate;
	
	public List<Movie> findByMovieName(String moviename) {
		System.out.println(moviename);;
		Query query = new Query(); 
		query.addCriteria(Criteria.where("_id").regex("^"+moviename));
		List<Movie> movies = mongoTemplate.find(query,Movie.class);
		return movies;
	}

	public Movie addMovie(Movie movie) {
		for(Theatre theatre:movie.getTheatres()) {
			IntStream stream=IntStream.iterate(1, i->i+1).limit(theatre.getTotalTicket());
			List<Integer> seatNumbers=stream.collect(ArrayList<Integer>::new,ArrayList::add, ArrayList::addAll);
			theatre.setSeatNumber(seatNumbers);
			theatre.setTicketStatus("BOOK ASAP");
		}
		
		return movieRepository.save(movie);
	}
	
	
	public Movie getMovieByTheatre(String movieName,String theatreName) {
		return movieRepository.findByMovieNameAndTheatreName(movieName, theatreName);
	}

	
	
	

}
