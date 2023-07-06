package com.moviebooking.model;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "users")
public class User {
  @Id
  private String LoginId;

  @NotBlank
  @Size(max = 20)
  private String firstName;
  
  @NotBlank
  @Size(max = 20)
  private String LastName;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @NotBlank
  @Size(max = 120)
  private String password;
  
  @NotBlank
  @Size(max = 20)
  private String contactNumber;

  @DBRef
  private Set<Role> roles = new HashSet<>();

  public User() {
  }

  

  



public void setFirstName(String firstName) {
	this.firstName = firstName;
}


public String getFirstName(){
	return firstName;
}


public String getLastName() {
	return LastName;
}



public void setLastName(String lastName) {
	LastName = lastName;
}



public String getContactNumber() {
	return contactNumber;
}



public void setContactNumber(String contactNumber) {
	this.contactNumber = contactNumber;
}



public void setLoginId(String loginId) {
	LoginId = loginId;
}



public String getLoginId() {
    return LoginId;
  }

 
  

  public User( @NotBlank @Size(max = 20) String firstName, @NotBlank @Size(max = 20) String lastName,
		@NotBlank @Size(max = 50) @Email String email, @NotBlank @Size(max = 120) String password,
		@NotBlank @Size(max = 20) String contactNumber) {
	super();
	this.firstName = firstName;
	LastName = lastName;
	this.email = email;
	this.password = password;
	this.contactNumber = contactNumber;
}



public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }












}
