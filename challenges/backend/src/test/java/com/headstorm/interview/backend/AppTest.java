package com.headstorm.interview.backend;

import java.util.Arrays;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

public class AppTest extends TestCase
{
	public AppTest()
	{
		super("REST App Test");
	}

	public static Test suite()
	{
		return new TestSuite(AppTest.class);
	}
	
	public void testGet()
	{
		assertTrue(DataManager.getData().length == 0);
		
		int[] test = new int[] {4, 5, 6, 7};
		DataManager.setData(test);
		assertTrue(Arrays.equals(test, DataManager.getData()));
		
		DataManager.setData(new int[0]);
	}
	
	public void testPost()
	{
		int[] test = new int[] {7, 4, 9, 2};
		DataManager.setData(test);
		assertFalse(Arrays.equals(test, DataManager.getData()));
		Arrays.sort(test);
		assertTrue(Arrays.equals(test, DataManager.getData()));
		test[0] = 1;
		assertFalse(Arrays.equals(test, DataManager.getData()));
		
		DataManager.setData(new int[0]);
	}
	
	public void testPatch()
	{
		int[] test = new int[] {4, 5, 6, 7};
		DataManager.setData(test);
		
		int random = (int)(Math.random() * 10000);
		DataManager.insertData(random);
		assertFalse(Arrays.equals(test, DataManager.getData()));
		
		int[] test2 = new int[] {4, 5, 6, 7, random};
		Arrays.sort(test2);
		assertTrue(Arrays.equals(test2, DataManager.getData()));
		
		DataManager.setData(new int[0]);
	}
}