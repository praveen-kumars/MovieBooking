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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.moviebooking.payload.request.TicketUpdatePayload;
import com.moviebooking.service.KafkaProducer;
import com.moviebooking.service.adminService;

@RestController
@CrossOrigin(origins  = "http://localhost:4200")
public class AdminController {
	
	@Autowired
	adminService adminService;
	
	@Autowired
	KafkaProducer kafkaProducer;
	

	private static final Logger LOGGER=LoggerFactory.getLogger(AdminController.class);
	
	/*@PutMapping(path = "/{moviename}/update/{ticket}/{theatreName}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<Ticket> updateTicket(@PathVariable String moviename,@PathVariable String ticket,@PathVariable String theatreName){
		
		return adminService.updateTicket(moviename,ticket,theatreName);
	}*/
	
	@PutMapping(path = "/ticketcount")
	@PreAuthorize(" hasRole('ADMIN')")
	public ResponseEntity<TicketUpdatePayload> updateTicketcount(@RequestBody TicketUpdatePayload ticketRequest){
		LOGGER.info("Ticket payload request");
		kafkaProducer.sendMessage(ticketRequest);
		LOGGER.info("Kafka producer send ticketrequest");
		return ResponseEntity.ok(ticketRequest);
	}
	
	@PutMapping(path = "/ticketstatus")
	@PreAuthorize(" hasRole('ADMIN')")
	public ResponseEntity<TicketUpdatePayload> updateticketStatus(@RequestBody TicketUpdatePayload ticketRequest){
		LOGGER.info("Ticket payload request");
		adminService.setStatus(ticketRequest);
		LOGGER.info("Kafka producer send ticketrequest");
		return ResponseEntity.ok(ticketRequest);
	}
	
	@DeleteMapping(path = "/{moviename}")
	@PreAuthorize(" hasRole('ADMIN')")
	public ResponseEntity<String> delteTicket(@PathVariable String moviename){
		LOGGER.info("Deleting Movie");
		adminService.deleteMovie(moviename);
		LOGGER.info("Movie successfully deleted");
		return new ResponseEntity<>("Deleted successfully",HttpStatus.OK);
	}
	
	@DeleteMapping(path = "/{moviename}/{theatreName}")
	@PreAuthorize(" hasRole('ADMIN')")
       public ResponseEntity<String> delteMovieByTheatret(@PathVariable String moviename,@PathVariable String theatreName){
		LOGGER.info("DeleteMovieByTheatreName");
		adminService.deleteMovieByTheatre(moviename,theatreName);
		LOGGER.info("Deleted Theatre of a movie");
		return new ResponseEntity<>("Deleted successfully",HttpStatus.OK);
	}
	
	@GetMapping("/fetchNoOfTicketsBookedForAMove/{movieName}")
	public ResponseEntity<Long> getNoOfTicketsBookedForAMove(@PathVariable String movieName) {

		LOGGER.info("Fetching the number of tickets booked for a movie");
		

		LOGGER.info("Process completed for Fetching number of tickets booked for a movie");

		return new ResponseEntity<>(adminService.fetchTotalTicket(movieName),HttpStatus.OK);

	}

	@GetMapping("/fetchNoOfTicketsAvailableForAMoveByTheaterName/{movieName}/{theaterName}")
	public ResponseEntity<Long> getNoOfTicketsAvailableForAMove(@PathVariable String movieName,
			@PathVariable String theaterName) {
		
		LOGGER.info("Fetching the number of tickets available for a movie");
	
		return new ResponseEntity<>(adminService.fetchTotalTicketByTheatre(movieName,theaterName),HttpStatus.OK);

	}
	

	

}
