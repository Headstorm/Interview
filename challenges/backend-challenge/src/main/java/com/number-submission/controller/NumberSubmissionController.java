package com.numbersubmission.controller;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.numbersubmission.service;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
public class NumberSubmissionController {
	
	public static final Logger logger = LoggerFactory.getLogger(RestApiController.class);

	@Autowired
	NumberSubmissionService numberSubmissionService;

	@PostMapping("/data")
	public ResponseEntity<?> numberList(@RequestBody List<Int> numberList) {
		if (numberList.length() != 500) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body("Number list must be exactly 500 numbers. Please try again."));
		} else{
			numberSubmissionService.saveNumberList(numberList);
		}
	}

	@GetMapping("/data")
	public ResponseEntity<List<Int>> numberList() {
		List<Int> sortedNumberList = numberSubmissionService.getSortedLatestList();
		if(sortedNumberList.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND);
		}
		return ResponseEntity.ok(sortedNumberList);
	}

	@PatchMapping("/data")
	public ResponseEntity<?> insertValIntoList(@RequestParam Int number) {
		List<Int> numberList = numberSubmissionService.getLatestList();
		if(!numberList.isEmpty()) {
			numberSubmissionService.insertValIntoList(number);
			return ResponseEntity.status(HttpStatus.OK);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND);
		}
	}
}