package com.headstorm.interview.database;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

public class AppTest extends TestCase
{
	public AppTest()
	{
		super("Database App Test");
	}

	public static Test suite()
	{
		return new TestSuite(AppTest.class);
	}
	
	public void testNoSlots()
	{
		String initial = "This has no query slots;";
		String end = SQLFormatUtil.setNextValue(initial, "Test").toString();
		
		assertTrue(initial.equals(end));
	}
	
	public void testExcessSlots()
	{
		String initial = "This has two query slots: ?, ?;";
		String end = SQLFormatUtil.setNextValue(initial, "Test").toString();
		
		assertFalse(initial.equals(end));
		assertTrue(end.contains("Test"));
		assertTrue(end.charAt(end.length() - 2) == '?');
	}
	
	public void testExactSlots()
	{
		String initial = "This has one query slot: ?;";
		String end = SQLFormatUtil.setNextValue(initial, "Test").toString();
		
		assertFalse(initial.equals(end));
		assertTrue(end.contains("Test"));
		assertFalse(end.contains("?"));
	}
}