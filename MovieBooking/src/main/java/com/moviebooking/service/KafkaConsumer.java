package com.moviebooking.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.moviebooking.model.Movie;
import com.moviebooking.model.Theatre;
import com.moviebooking.payload.request.TicketUpdatePayload;
import com.moviebooking.repository.MovieRepository;

@Service
public class KafkaConsumer {
	
	@Autowired
	MovieRepository movieRepository;
	
private static final Logger LOGGER=LoggerFactory.getLogger(KafkaConsumer.class);
	

	/*@KafkaListener(topics = "movieticket",groupId = "myGroupId")
	public void consume(TicketUpdatePayload data) {
		LOGGER.info(String.format("Json message received ->%s", data.toString()));
	Movie result=movieRepository.findByMovieNameAndTheatreName(data.getMovieName(),data.getTheatreName());
		List<Theatre> theatres=result.getTheatres();
		for(Theatre list: theatres) {
			if(list.getTheatreName().equals(data.getTheatreName())) 
				  movieRepository.updateStatus(data.getMovieName(),data.getTheatreName(),data.getTicketcount());
		}
	
	}*/

}
