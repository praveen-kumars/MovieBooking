package com.moviebooking.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

import org.springframework.messaging.Message;
import com.moviebooking.payload.request.TicketUpdatePayload;



@Service
public class KafkaProducer {
	
	
    private static final Logger Logger=LoggerFactory.getLogger(KafkaProducer.class);
 	
	@Autowired
	private KafkaTemplate<TicketUpdatePayload,String> kafkaTemplate;
	
	public void sendMessage(TicketUpdatePayload data) {
	
        Logger.info(String.format("Message send -> %s",data.toString()));
		Message<TicketUpdatePayload> message=MessageBuilder.withPayload(data).setHeader(KafkaHeaders.TOPIC,"movieticket").build();
		kafkaTemplate.send(message);
		
	}
	

}
