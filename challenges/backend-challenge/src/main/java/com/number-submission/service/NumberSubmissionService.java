package com.numbersubmission.service;

import java.util.List;

public interface NumberSubmissionService {
	
	void saveNumberList(List<Int> numberList);

	List<Int> getLatestList();

	List<Int> getSortedLatestList();
	
	void insertValIntoList(Int number);
	
}
