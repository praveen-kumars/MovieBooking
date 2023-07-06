package com.moviebooking.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moviebooking.model.Ticket;
import com.moviebooking.payload.request.TicketRequest;
import com.moviebooking.service.SequenceGeneratorService;
import com.moviebooking.service.TicketService;

@WebMvcTest(TicketController.class)
@AutoConfigureMockMvc(addFilters = false)
public class TicketControllerTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private TicketService ticketService;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	
	
	@Test
	public void givenEmployeeObject_whenCreateEmployee_thenReturnEmployee() throws Exception {
		//given
		TicketRequest ticket=new TicketRequest("praveen","Marvel","PVR",100L,List.of(1,2,3));
		Ticket ticket1=new Ticket("praveen","Marvel","PVR",100L,List.of(1,2,3));
		 BDDMockito.given(ticketService.bookTickets("Marvel",ticket))
		 .willAnswer((invocation)->invocation.getArgument(0));
		//when
		ResultActions response =mockMvc.perform(post("/movies/{moviename}/add","Marvel")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(ticket)));
				
		//return
		response.andDo(print())
		.andExpect(status().isCreated());
	}

}
