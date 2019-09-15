package com.headstorm.interview.backend;

import java.util.Arrays;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class DataManager
{
	private static final ReentrantReadWriteLock LOCK = new ReentrantReadWriteLock();
	private static int[] CACHED_DATA = new int[0];
	
	public static void setData(int[] newData)
	{
		LOCK.writeLock().lock();
		
		CACHED_DATA = new int[newData.length];
		
		if (newData.length > 0)
		{
			System.arraycopy(newData, 0, CACHED_DATA, 0, newData.length);
			Arrays.sort(CACHED_DATA);
		}
		
		LOCK.writeLock().unlock();
	}
	
	public static int[] getData()
	{
		int[] copy;
		
		LOCK.readLock().lock();
		
		copy = new int[CACHED_DATA.length];
				
		if (CACHED_DATA.length > 0)
		{
			System.arraycopy(CACHED_DATA, 0, copy, 0, CACHED_DATA.length);
		}
		
		LOCK.readLock().unlock();
		
		return copy;
	}
	
	public static void insertData(int data)
	{
		LOCK.writeLock().lock();
		
		int i = Arrays.binarySearch(CACHED_DATA, data);
		int[] newData = new int[CACHED_DATA.length + 1];
		
		if (i < 0)
		{
			i = (-1 * i) - 1;
		}
		
		if (CACHED_DATA.length > 0 && i > 0)
		{
			System.arraycopy(CACHED_DATA, 0, newData, 0, i);
		}
		
		newData[i] = data;
		
		if (CACHED_DATA.length - i > 0)
		{
			System.arraycopy(CACHED_DATA, i, newData, i + 1, CACHED_DATA.length - i);
		}
		
		CACHED_DATA = newData;
		
		LOCK.writeLock().unlock();
	}
}