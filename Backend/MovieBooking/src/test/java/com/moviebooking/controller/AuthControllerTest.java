/*package com.moviebooking.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moviebooking.model.Role;
import com.moviebooking.model.User;
import com.moviebooking.payload.request.SignupRequest;
import com.moviebooking.repository.RoleRepository;
import com.moviebooking.repository.UserRepository;
import com.moviebooking.util.JwtUtils;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
public class AuthControllerTest {
	
	
	@MockBean
	AuthenticationManager authenticationManager;

	@MockBean
	UserRepository userRepository;

	@MockBean
	RoleRepository roleRepository;

	@MockBean
	JwtUtils jwtUtils;
	
	@Autowired
	MockMvc mockMvc;
	
	@MockBean
	PasswordEncoder passwordEncoder;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Test
	public void signupTest() throws Exception {
		//given
	
		Set<Role> roles = new HashSet<>();
		roles.add(new Role("admin"));
		
		SignupRequest signupRequest=new SignupRequest("praveen","Kumar","praveencbe525@gmail.com",roles,passwordEncoder.encode("praveen"),"8220551298");
		User user=new User("praveen","Kumar","praveencbe525@gmail.com",passwordEncoder.encode("praveen"),"8220551298");
		BDDMockito.given(passwordEncoder.encode(user.getPassword()))
		.willAnswer((invocation)->invocation.getArgument(0));
		BDDMockito.given(userRepository.existsByFirstName(user.getFirstName()))
		.willAnswer((invocation)->invocation.getArgument(0));
		BDDMockito.given(userRepository.existsByEmail(user.getEmail()))
		.willAnswer((invocation)->invocation.getArgument(0));
		//when
		ResultActions response =mockMvc.perform(post("/signup")
				.contentType(MediaType.APPLICATION_JSON)
				.characterEncoding("utf-8")
				.content(objectMapper.writeValueAsString(signupRequest)))
				
				;
				
		//return
		response.andDo(print())
		.andExpect(status().isOk());
		
		
	}

}
*/