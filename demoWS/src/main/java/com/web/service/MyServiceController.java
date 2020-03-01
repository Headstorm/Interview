package com.web.service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("data")
public class MyServiceController {
	
	@SuppressWarnings("unchecked")
	@PostMapping(value= "postdigits", produces= { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<?>   postDigits(@RequestBody List<BigDecimal> list ) {
		if(list.size()!=500) {
			Date date = new Date();
			return new ResponseEntity<Object>(new CustomErrorMessage(new Timestamp(date.getTime()).toString(),HttpStatus.BAD_REQUEST.toString(),"Bad Request","Count of the numbers must be 500","/data/postdigits"),HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@GetMapping(value= "sorteddigits", produces= { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<?> getSortedDigits(@RequestBody List<BigDecimal> list) {
		
		if(list.size()!=500) {
			 Date date = new Date();
			return new ResponseEntity<Object>(new CustomErrorMessage(new Timestamp(date.getTime()).toString(),HttpStatus.BAD_REQUEST.toString(),"Bad Request","Count of the numbers must be 500","/data/sorteddigits"),HttpStatus.BAD_REQUEST);
			}
		Collections.sort(list);
		return new ResponseEntity<List<BigDecimal>>(list, HttpStatus.OK);
		
	}
}
