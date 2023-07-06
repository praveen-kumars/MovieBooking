package com.moviebooking.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.moviebooking.model.Ticket;
import com.moviebooking.payload.request.TicketRequest;
import com.moviebooking.repository.MovieRepository;
import com.moviebooking.repository.TicketRepository;
import com.moviebooking.service.TicketService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TicketController {
	
	@Autowired
	TicketService ticketService;
	private static final Logger LOGGER=LoggerFactory.getLogger(MovieSearchController.class);
	
	@PostMapping(path="/movies/{moviename}/add")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<Ticket> bookTicket(@RequestBody TicketRequest ticketRequest,@PathVariable("moviename") String moviename){
		LOGGER.info("Booking new Tickets");
		return new ResponseEntity<>(ticketService.bookTickets(moviename,ticketRequest),HttpStatus.CREATED);

	}
	
	
	@GetMapping(path="/retrieveTickets/{userName}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<Ticket>> getTicket(@PathVariable("userName") String userName){
		LOGGER.info("Booking new Tickets");
		return new ResponseEntity<>(ticketService.getTickets(userName),HttpStatus.OK);

	}
	
	
	

}
