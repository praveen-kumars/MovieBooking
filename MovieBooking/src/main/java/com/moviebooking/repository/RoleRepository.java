package com.moviebooking.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.moviebooking.model.ERole;
import com.moviebooking.model.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
	  Optional<Role> findByName(ERole name);
	  
	}