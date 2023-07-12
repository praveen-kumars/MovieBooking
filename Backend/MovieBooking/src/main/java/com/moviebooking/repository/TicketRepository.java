package com.moviebooking.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.moviebooking.model.Ticket;

public interface TicketRepository extends MongoRepository<Ticket,String> {

	Ticket findByUserName(String userName);

}
