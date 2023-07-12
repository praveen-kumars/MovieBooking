package com.moviebooking.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import com.moviebooking.model.Movie;
import com.moviebooking.model.Theatre;
import com.moviebooking.repository.MovieRepository;

@ExtendWith(MockitoExtension.class)
public class MovieViewServiceTest {
	
	@Mock
	private MovieRepository movieRepository;
	
	@Mock
	private MongoTemplate mongoTemplate;
	
	@InjectMocks
	private MovieViewService movieViewService;
	
	@Test
	public void getAllMoviesTest() {
		//given
		Movie movie;
		List<Theatre> theatre=new ArrayList<>();
		theatre.add(new Theatre("PVR",100));
		theatre.add(new Theatre("INOX",150));
		movie=new Movie("Marvel",theatre);
		
				BDDMockito.given(movieRepository.save(movie)).willReturn(movie);
				
				//when
				Movie savedMovie=movieViewService.addMovie(movie);
				
				//then
				assertThat(savedMovie).isNotNull();
				assertThat(savedMovie.getMovieName()).isEqualTo("Marvel");	
		
	}
	
	@Test
	public void findBYmOVIEnAME() {
		//given
		
		
		Movie movie;
		List<Theatre> theatre=new ArrayList<>();
		theatre.add(new Theatre("PVR",100));
		theatre.add(new Theatre("INOX",150));
		movie=new Movie("Marvel",theatre);
		List<Movie> movielistList=new ArrayList<>();
		movielistList.add(movie);
		movieRepository.save(movie);
		Query query=new Query();

		query.addCriteria(Criteria.where("_id").regex("^"+"MARVEL"));
		//		BDDMockito.given(mongoTemplate.find(query,Movie.class)).willReturn(movielistList);
				
				//when
				List<Movie> savedMovie=movieViewService.findByMovieName(movie.getMovieName());
				
				//then
				assertThat(savedMovie).isNotNull();	
		
	}
	

}
