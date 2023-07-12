package com.moviebooking.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.hamcrest.CoreMatchers;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moviebooking.model.Movie;
import com.moviebooking.model.Theatre;
import com.moviebooking.repository.MovieRepository;
import com.moviebooking.service.MovieViewService;

@WebMvcTest(MovieSearchController.class)
@AutoConfigureMockMvc(addFilters = false)
class MovieSearchControllerTest {

	@Autowired
	private MockMvc mockMvc; 
	
	@MockBean
	private MovieViewService movieViewService;
	
	@MockBean
	private MovieRepository movieRepository;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Test
	void addMovieTest() throws Exception{
		
		Movie movie=new Movie();
		when(movieViewService.addMovie(ArgumentMatchers.any(Movie.class))).thenReturn(movie);
		List<Theatre> theatre=new ArrayList<>();
		theatre.add(new Theatre("PVR",100));
		theatre.add(new Theatre("INOX",150));
		BDDMockito.given(movieViewService.addMovie(ArgumentMatchers.any(Movie.class)))
		.willReturn(movie);
		//when
		ResultActions response =mockMvc.perform(post("/movies/add")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(movie)));
				
		//return
		response.andDo(print())
		.andExpect(status().isCreated());
		
		
		
	}
	
	@Test
	void retrieveMovieTest() throws Exception{
		
		
		List<Theatre> theatre=new ArrayList<>();
		theatre.add(new Theatre("PVR",100));
		theatre.add(new Theatre("INOX",150));
		List<Movie> movies=new ArrayList<>();
		Movie movie=		new Movie("Marvel",theatre);
		movies.add(movie);
		when(movieViewService.addMovie(ArgumentMatchers.any(Movie.class))).thenReturn(movie);
		
		
		BDDMockito.given(movieViewService.findByMovieName("Marvel"))
	.willReturn(movies);	//when
		ResultActions response =mockMvc.perform(get("/movies/search/{moviename}","Marvel"));
			
		//return
		response.andDo(print())
		.andExpect(status().isOk());
	}
	
	@Test
	void retrieveAllMovie() throws Exception{
		
		
		List<Theatre> theatre=new ArrayList<>();
		theatre.add(new Theatre("PVR",100));
		theatre.add(new Theatre("INOX",150));
		List<Movie> movies=new ArrayList<>();
		Movie movie=		new Movie("Marvel",theatre);
		movies.add(movie);
		when(movieRepository.findAll()).thenReturn(movies);
		
		//when
		ResultActions response =mockMvc.perform(get("/all"));
			
		//return
		response.andDo(print())
		.andExpect(status().isOk());
	}
}
