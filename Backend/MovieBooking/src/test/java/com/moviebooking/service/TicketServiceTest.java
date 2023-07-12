package com.moviebooking.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

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
import com.moviebooking.repository.TicketRepository;

@ExtendWith(MockitoExtension.class)
public class TicketServiceTest {
	
	@Mock
	private TicketRepository ticketRepository;
	
	@Mock
	private SequenceGeneratorService sequenceGeneratorService;
	
	@Mock
	private MovieRepository movieRepository;
	
	@InjectMocks
	private TicketService ticketService;
	
	@Test
	public void BookTicketTest() {


		List<Theatre> theatre=new ArrayList<>();
		theatre.add(new Theatre("PVR",100));

		Movie movie=new Movie("Marvel",theatre);
		movieRepository.save(movie);
		TicketRequest ticket=new TicketRequest("praveen","Marvel","PVR",100L,List.of(1,2,3));
		
		//given
		BDDMockito.given(movieRepository.findByMovieNameAndTheatreName(ticket.getMovieName(),ticket.getTheatreName())).willReturn(movie);

	//	BDDMockito.given(movieRepository.updateticketstatus(ticket.getMovieName(),ticket.getTheatreName(),100L)).willReturn(null);
	//	BDDMockito.willDoNothing().given(movieRepository).updateStatus(ticket.getMovieName(),ticket.getTheatreName(),"BOOK ASAP");
		//BDDMockito.willDoNothing().given(movieRepository).updateSeats(ticket.getMovieName(),ticket.getTheatreName(),List.of(1,2,3));
		//when
		BDDMockito.given(sequenceGeneratorService.generateSequence(Ticket.SEQUENCE_NAME)).willReturn(21L);
		
		Ticket ticketbooked=ticketService.bookTickets("Marvel",ticket);

		ticketbooked.setId(sequenceGeneratorService.generateSequence(Ticket.SEQUENCE_NAME));
		
		
		//then
		assertThat(ticketbooked).isNotNull();
		assertThat(ticketbooked.getMovieName()).isEqualTo("Marvel");	
	}

}

