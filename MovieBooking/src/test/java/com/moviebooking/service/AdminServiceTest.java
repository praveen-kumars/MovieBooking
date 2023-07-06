package com.moviebooking.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.moviebooking.model.Movie;
import com.moviebooking.model.Theatre;
import com.moviebooking.model.Ticket;
import com.moviebooking.payload.request.TicketRequest;
import com.moviebooking.repository.MovieRepository;

@ExtendWith(MockitoExtension.class)
public class AdminServiceTest {
	
	@Mock
	private MovieRepository movieRepository;
	
	@Mock
	SequenceGeneratorService sequenceGeneratorService;
	
	@InjectMocks
	private adminService adminService;
	
	@Test
	void updatetotalTicketTests() {
		
		String movieName="Marvel";
		List<Theatre> theatre=new ArrayList<>();
		theatre.add(new Theatre("PVR",100L,"Book Asap",List.of(1,2,3,4,5,6)));
		Movie movie=new Movie(movieName,theatre);
		
		TicketRequest ticketRequest=new TicketRequest("praveen","Marvel","PVR",10L,List.of(1,2,3,4,5,6,7));
		
		BDDMockito.given(movieRepository.findByMovieNameAndTheatreName(movieName, ticketRequest.getTheatreName())).willReturn(movie);
		//BDDMockito.given(movieRepository.updateticketstatus(movieName,ticketRequest.getTheatreName(),100L- ticketRequest.getTicketCount())).willReturn(ticketRequest.getTicketCount());
		//BDDMockito.willDoNothing().given(movieRepository).updateSeats(movieName,ticketRequest.getTheatreName(),ticketRequest.getSeatNumber());
		//BDDMockito.willDoNothing().given(movieRepository).updateStatus(movieName,ticketRequest.getTheatreName(),"Book Asap");
		
		Ticket ticket1=new Ticket(ticketRequest.getUserName(), ticketRequest.getMovieName(),ticketRequest.getTheatreName(),ticketRequest.getTicketCount(),ticketRequest.getSeatNumber());
   	    BDDMockito.given(sequenceGeneratorService.generateSequence(Ticket.SEQUENCE_NAME)).willReturn(1L);
   	    
   	    Ticket savedTicket=adminService.updateTicket(movieName, ticketRequest.getTheatreName(), ticketRequest);
		assertThat(savedTicket).isNotNull();
		assertThat(savedTicket.getMovieName()).isEqualTo("Marvel");	
	}
	
	@Test
	public void voidDeleteMovieByTest() {

		String movieName="Marvel";
		List<Theatre> theatre=new ArrayList<>();
		theatre.add(new Theatre("PVR",100L,"Book Asap",List.of(1,2,3,4,5,6)));
		Movie movie=new Movie(movieName,theatre);
		BDDMockito.given(movieRepository.findById(movieName)).willReturn(Optional.of(movie));
		adminService.deleteMovie(movieName);
		verify(movieRepository,times(1)).delete(movie);
		
	}
	 
	@Test
	public void voidDeleteMovieByTheatreTest() {
		String movieName="Marvel";
		List<Theatre> theatre=new ArrayList<>();
		theatre.add(new Theatre("PVR",100L,"Book Asap",List.of(1,2,3,4,5,6)));
		Movie movie=new Movie(movieName,theatre);
		BDDMockito.given(movieRepository.findById(movieName)).willReturn(Optional.of(movie));
		adminService.deleteMovieByTheatre(movieName,"PVR");
		
	}

}
