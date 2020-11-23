package com.numbersubmission.service;

import java.util.List;

@Service("numberSubmissionService")
public class NumberSubmissionServiceImpl implements NumberService{
		
	private static List<Int> numberList;

	public void saveNumberList(List<Int> numberList) {
		this.numberList = numberList;
	}

	public List<Int> getLatestList() {
		return numberList;
	}
	public List<Int> getSortedLatestList() {
		if(!numberList.isEmpty()) {
			return Collections.sort(numberList);
		}
		return new List<Int>();
	}

	public void insertValIntoList(Int number) {
		if(!numberList.isEmpty()) {
			List<Int> sortedNumberList = Collections.sort(numberList);
			int index = 0;
			// Find earliest sorted position or final index
			while (sortedNumberList[index] < number || index == sortedNumberList.length() - 1) {
				index++;
			}
			// Store val to replace
			int valToReplace = sortedNumberList[index];
			int index = 0;
			while (numberList[index] != valToReplace) {
				index ++;
			}
			// Replace at first occurence in original list
			// (to avoid overlap w future implementations)
			numberList[index] = number;
		}
	}
}
