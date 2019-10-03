package com.test.headstorm.challenge.service;

import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

/**
 * <p>  </p>
 *
 * @author
 * @version $Id: RandomNumbersService.java, v 0.1 2019/8/15  Exp $
 */
@Service
public class RandomNumbersService {

    public String numbersCheck(List<Integer> reqList) {
        if (reqList.size() == 500)
            return "success";
        else
            return "error";
    }

    public List<Integer> numbersSort(List<Integer> reqList) {
        Collections.sort(reqList);
        return reqList;
    }

    public List<Integer> numbersAdd(List<Integer> reqList, Integer random) {
        reqList.add(random);
        return reqList;
    }
}
