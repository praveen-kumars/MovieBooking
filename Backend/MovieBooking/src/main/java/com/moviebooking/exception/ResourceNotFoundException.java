package com.moviebooking.exception;

import java.text.Format;

public class ResourceNotFoundException extends RuntimeException{
	
	String id;
	
	String messgae;

	public ResourceNotFoundException(String id, String messgae) {
		super(String.format("%s not found %s",messgae,id));
		this.id = id;
		this.messgae = messgae;
	}
	
	

}
