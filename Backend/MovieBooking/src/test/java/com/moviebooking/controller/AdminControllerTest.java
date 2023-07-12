package com.moviebooking.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
import com.moviebooking.payload.request.TicketUpdatePayload;
import com.moviebooking.service.KafkaProducer;
import com.moviebooking.service.adminService;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(AdminController.class)
public class AdminControllerTest {
	
	@MockBean
	private adminService adminService;
	
	@Autowired
	private MockMvc mockMvc;
	
	
	@MockBean
	private KafkaProducer kafkaProducer;
	
	@Autowired
	private ObjectMapper objectMapper;
	

	@Test
	public void DELETEMOVIE() throws Exception {
		
		
		BDDMockito.willDoNothing().given(adminService).deleteMovie("Marvel");
		//when
		ResultActions response =mockMvc.perform(delete("/{moviename}","Marvel"));
				
		//return
		response.andDo(print())
		.andExpect(status().isOk());
	

	}

	@Test
	public void deleteMovieByTheatre() throws Exception {
		
		
		BDDMockito.willDoNothing().given(adminService).deleteMovieByTheatre("Marvel",
				"PVR");
		//when
		ResultActions response =mockMvc.perform(delete("/{moviename}/{theatreName}","Marvel","PVR"));
				
		//return
		response.andDo(print())
		.andExpect(status().isOk());
	

	}
	
	@Test
	public void kafaproducersend() throws Exception {
		
		TicketUpdatePayload ticketUpdatePayload=new TicketUpdatePayload();
		BDDMockito.willDoNothing().given(kafkaProducer).sendMessage(ArgumentMatchers.any(TicketUpdatePayload.class));
		//when
		ResultActions response =mockMvc.perform(put("/ticketcount")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(ticketUpdatePayload)));
				
		//return
		response.andDo(print())
		.andExpect(status().isOk());
	

	}

}
