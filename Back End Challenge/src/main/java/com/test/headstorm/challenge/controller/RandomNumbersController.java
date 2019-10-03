package com.test.headstorm.challenge.controller;

import com.test.headstorm.challenge.service.RandomNumbersService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * <p>  </p>
 *
 * @author
 * @version $Id: RandomNumbersController.java, v 0.1 2019/8/15  Exp $
 */
@RestController
@RequestMapping(value="/data")
public class RandomNumbersController {
    private Logger logger = LoggerFactory.getLogger(RandomNumbersController.class);

    @Resource
    RandomNumbersService randomNumbersService;

    @PostMapping(value="/numbers", consumes = "application/json")
    public String numbersCheck(@RequestBody List<Integer> reqList) {
        return randomNumbersService.numbersCheck(reqList);
    }

    @GetMapping(value="/numbers", consumes = "application/json")
    public List<Integer> numbersSort(@RequestBody List<Integer> reqList) {
        return randomNumbersService.numbersSort(reqList);
    }

    @PatchMapping(value="/numbers/{random}", consumes = "application/json")
    public List<Integer> numbersAdd(@RequestBody List<Integer> reqList, @PathVariable("random") Integer random ) {
        randomNumbersService.numbersAdd(reqList, random);
        return randomNumbersService.numbersSort(reqList);
    }

}
