package com.moviebooking.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;

import com.moviebooking.model.Movie;

@Repository
public interface MovieRepository extends MongoRepository<Movie,String>{

//	boolean existsByMovieName(String moviename);

	Movie findByMovieName(String moviename);

	@Query("{'_id':?0, 'theatres':{'$elemMatch':{'theatreName':?1}}}")
	Movie findByMovieNameAndTheatreName(String moviename, String theatreName);

	@Query("{'_id':?0,'theatres':{'$elemMatch':{'theatreName':?1}}}")
	@Update("{$set:{'theatres.$.totalTicket':?2}},{upsert:true}")
	Long updateticketstatus(String moviename, String theatreName, Long ticketCount);

	@Query("{'_id':?0,'theatres':{'$elemMatch':{'theatreName':?1}}}")
	@Update("{$set:{'theatres.$.seatNumber':?2}},{upsert:true}")
	void updateSeats(String moviename, String theatreName, List<Integer> seatnumber);

	@Query("{'_id':?0,'theatres':{'$elemMatch':{'theatreName':?1}}}")
	@Update("{$set:{'theatres.$.ticketStatus':?2}},{upsert:true}")
	void updateStatus(String moviename, String theatreName, String ticketStatus);

	//void updateNoOfTickets(String moviename, String theatreName, int ticketCount);

	

	/*@Query("{'MovieName': {$regex:/MovieName}})")
	List<Movie> findByMovieName( String MovieName);*/

	
	

}
