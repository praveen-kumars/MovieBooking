package com.moviebooking.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.moviebooking.model.User;

@Repository
public interface UserRepository extends MongoRepository<User,Long> {
	
	  Optional<User> findByEmail(String email);
	
	  Boolean existsByFirstName(String username);

	  Boolean existsByEmail(String email);
	

}
