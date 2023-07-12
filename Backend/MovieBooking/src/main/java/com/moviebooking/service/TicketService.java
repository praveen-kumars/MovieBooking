package com.moviebooking.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.moviebooking.model.Movie;
import com.moviebooking.model.Theatre;
import com.moviebooking.model.Ticket;
import com.moviebooking.payload.request.TicketRequest;
import com.moviebooking.repository.MovieRepository;
import com.moviebooking.repository.TicketRepository;



@Service
public class TicketService {
	
	@Autowired
	TicketRepository ticketRepository;
	
	@Autowired
	MovieRepository movieRepository;
	
	@Autowired
	SequenceGeneratorService sequenceGeneratorService;
	
	@Autowired
	MongoTemplate mongoTemplate;
	
	
	
	

public Ticket bookTickets(String moviename,TicketRequest ticketRequest) {
		
		Movie result=movieRepository.findByMovieNameAndTheatreName(ticketRequest.getMovieName(),ticketRequest.getTheatreName());
		List<Theatre> theatres=result.getTheatres();
		
		for(Theatre list: theatres) {
			if(list.getTheatreName().equals(ticketRequest.getTheatreName())) {
				if(list.getTotalTicket()>=ticketRequest.getTicketCount()) {
				  long availableticket=list.getTotalTicket()- ticketRequest.getTicketCount();
				  if(ticketRequest.getTicketCount()==ticketRequest.getSeatNumber().size()) {
				  movieRepository.updateticketstatus(moviename,ticketRequest.getTheatreName(),list.getTotalTicket()- ticketRequest.getTicketCount());
				  list.getSeatNumber().removeAll(ticketRequest.getSeatNumber());
			      movieRepository.updateSeats(moviename,ticketRequest.getTheatreName(), list.getSeatNumber());
			      if(availableticket<=0) {
			    	 list.setTicketStatus("SOLD OUT");
			    	 movieRepository.updateStatus(moviename,ticketRequest.getTheatreName(), list.getTicketStatus());
			      }

			}
				  }
		}
			}
		
		 Ticket ticket=new Ticket(ticketRequest.getUserName(), ticketRequest.getMovieName(),ticketRequest.getTheatreName(),ticketRequest.getTicketCount(),ticketRequest.getSeatNumber());
    	 ticket.setId(sequenceGeneratorService.generateSequence(Ticket.SEQUENCE_NAME));
    	 ticketRepository.save(ticket);

		 return ticket;
	
		
		
	}


		public List<Ticket> getTickets(String userName) {
			Query query = new Query();
			query.addCriteria(Criteria.where("userName").regex("^"+userName));
			List<Ticket> ticket = mongoTemplate.find(query,Ticket.class);
			return ticket;
			
		}

}


	
 


