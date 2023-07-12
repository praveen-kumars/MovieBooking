package com.moviebooking.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.moviebooking.model.Movie;
import com.moviebooking.repository.MovieRepository;
import com.moviebooking.service.MovieViewService;


@RestController
@CrossOrigin(origins  = "http://localhost:4200")
public class MovieSearchController {
	

	private static final Logger LOGGER=LoggerFactory.getLogger(MovieSearchController.class);

	
	@Autowired
	MovieRepository movieRepository;
	
	@Autowired
	MovieViewService movieViewService;
	@GetMapping(path="/all")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<Movie>> retrieveAll(){
		LOGGER.info("Retrieving all movies");
		return ResponseEntity.ok(movieRepository.findAll());
		
	}
	

	@GetMapping(path="/movies/search/{moviename}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<Movie>> retrieveMovie(@PathVariable("moviename") String moviename){
		LOGGER.info("Retrieve Movie By Name");
		return new ResponseEntity<>(movieViewService.findByMovieName(moviename),HttpStatus.OK );
	}
	
	@PostMapping(path="movies/add")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Movie>  addMovie(@RequestBody Movie movie){
		LOGGER.info("Add movie to database");
		return new ResponseEntity<>( movieViewService.addMovie(movie),HttpStatus.CREATED);
	}
	
	@GetMapping(path = "retrieve/{moviename}/{theatreName}")
	@PreAuthorize(" hasRole('ADMIN')")
       public ResponseEntity<Movie> getMovieByTheatret(@PathVariable String moviename,@PathVariable String theatreName){
		LOGGER.info("DeleteMovieByTheatreName");
		
		LOGGER.info("Deleted Theatre of a movie");
		return new ResponseEntity<>(movieViewService.getMovieByTheatre(moviename,theatreName),HttpStatus.OK);
	}

}
