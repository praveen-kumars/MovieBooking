package com.moviebooking.service;

import java.util.List;
import java.util.ListIterator;

import org.apache.coyote.ContinueResponseTiming;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.moviebooking.exception.ResourceNotFoundException;
import com.moviebooking.model.Movie;
import com.moviebooking.model.Theatre;
import com.moviebooking.model.Ticket;
import com.moviebooking.payload.request.TicketRequest;
import com.moviebooking.payload.request.TicketUpdatePayload;
import com.moviebooking.repository.MovieRepository;

@Service
public class adminService {
	
	
	@Autowired
	private MovieRepository movieRepository;
	
	@Autowired
	SequenceGeneratorService sequenceGeneratorService;
	

	private static final Logger LOGGER=LoggerFactory.getLogger(adminService.class);
	
	public void setStatus(TicketUpdatePayload data) {
		Movie result=movieRepository.findByMovieNameAndTheatreName(data.getMovieName(),data.getTheatreName());
		List<Theatre> theatres=result.getTheatres();
		for(Theatre list: theatres) {
			if(list.getTheatreName().equals(data.getTheatreName())) 
				
				  movieRepository.updateStatus(data.getMovieName(),data.getTheatreName(),data.getTicketcount());
			
		}
	}
	
	
	

	public Ticket updateTicket(String moviename, String ticket,TicketRequest ticketRequest) {
		LOGGER.info("Retrieving movie from database");
		Movie result=movieRepository.findByMovieNameAndTheatreName(ticketRequest.getMovieName(),ticketRequest.getTheatreName());
		List<Theatre> theatres=result.getTheatres();
		for(Theatre list: theatres) {
			if(list.getTotalTicket()>=ticketRequest.getTicketCount()) {
			if(list.getTheatreName().equals(ticketRequest.getTheatreName())) {
				  long availableticket=list.getTotalTicket()- ticketRequest.getTicketCount();
					LOGGER.info("checking total count of ticket less than booked ticket");
				  if(ticketRequest.getTicketCount()==ticketRequest.getSeatNumber().size()) {
				  movieRepository.updateticketstatus(moviename,ticketRequest.getTheatreName(),list.getTotalTicket()- ticketRequest.getTicketCount());
				  list.getSeatNumber().removeAll(ticketRequest.getSeatNumber());
			      movieRepository.updateSeats(moviename,ticketRequest.getTheatreName(), list.getSeatNumber());
			      if(availableticket<=0) {
			    	 LOGGER.info("checking tickets available or not");
			    	 list.setTicketStatus("SOLD OUT");
			    	 movieRepository.updateStatus(moviename,ticketRequest.getTheatreName(), list.getTicketStatus());
			      }
			}}}}
		LOGGER.info("Creating new tickets");
		Ticket ticket1=new Ticket(ticketRequest.getUserName(), ticketRequest.getMovieName(),ticketRequest.getTheatreName(),ticketRequest.getTicketCount(),ticketRequest.getSeatNumber());
   	    ticket1.setId(sequenceGeneratorService.generateSequence(Ticket.SEQUENCE_NAME));
		return ticket1;
	}

	public void deleteMovieByTheatre(String moviename,String theatreName) {
		
		Movie result=movieRepository.findById(moviename).orElseThrow(()->new ResourceNotFoundException("moviename",moviename));
        List<Theatre> theatres=result.getTheatres();
    	LOGGER.info("Deleting movie by theatre");
    	 ListIterator<Theatre> iterator = theatres.listIterator();
    	 while (iterator.hasNext()) {

    		 String str=iterator.next().getTheatreName();
 			if(str.equals(theatreName)) {
 				iterator.remove();
 				break;
 				
 			}
		/*for(Theatre list: theatres) {
			if(list.getTheatreName().equals(theatreName)) {
				

				Movie movies =new Movie(moviename, theatres);
				movieRepository.save(movies);
				theatres.remove(list);
				Movie movies =new Movie(moviename, theatres);
				movieRepository.save(movies);*/
			}
    	 Movie movies =new Movie(moviename, theatres);
			movieRepository.save(movies);
		}
		
  public void deleteMovie(String moviename) {
	LOGGER.info("Deleting movie from database");
		Movie result=movieRepository.findById(moviename).orElseThrow(()->new ResourceNotFoundException("moviename",moviename));
		movieRepository.delete(result);
		
		
		
	}
  
   public Long fetchTotalTicket(String movieName) {
	   
	   Movie movie=movieRepository.findById(movieName).get();
	   List<Theatre> theatres=movie.getTheatres();
	   Long totalTicket=0L;
	   for(Theatre list: theatres) {
		   totalTicket=totalTicket+ list.getTotalTicket();
	   }
	   return totalTicket;
	  
  }
   
   public Long fetchTotalTicketByTheatre(String movieName,String theaterName) {
	   Movie movie=movieRepository.findById(movieName).get();
	   List<Theatre> theatres=movie.getTheatres();
	   Long totalTicket=0L;
	   for(Theatre list: theatres) {
		   if(list.getTheatreName().equals(theaterName)) {
		      totalTicket=totalTicket+ list.getTotalTicket();
	   }
	   else {
		continue;
	}}
	   return totalTicket;
   }




}
