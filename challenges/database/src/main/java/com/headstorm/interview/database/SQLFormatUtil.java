package com.headstorm.interview.database;

import java.util.regex.Pattern;

public class SQLFormatUtil
{
	private static String setNextValueInternal(String statement, Object value)
	{
		if (value == null)
		{
			return statement.replaceFirst(Pattern.quote("?"), "NULL");
		}
		
		if (value instanceof Number)
		{
			return statement.replaceFirst(Pattern.quote("?"), value.toString());
		}
		
		if (value instanceof Boolean)
		{
			return statement.replaceFirst(Pattern.quote("?"), value.toString());
		}
		
		char wrapper = '"';
		String serialized = value.toString();
		
		boolean containsDouble = serialized.contains("\"");
		boolean containsSingle = serialized.contains("'");
		
		if (containsDouble && containsSingle)
		{
			serialized = serialized.replace("\"", "");
		}
		else if (containsDouble)
		{
			wrapper = '\'';
		}
		
		return statement.replaceFirst(Pattern.quote("?"), wrapper + serialized + wrapper);
	}
	
	public static SQLBuilder setNextValue(String statement, Object value)
	{
		return new SQLBuilder(setNextValueInternal(statement, value));
	}
	
	public static class SQLBuilder
	{
		private String SQL_STATEMENT;
		
		private SQLBuilder(String statement)
		{
			SQL_STATEMENT = statement;
		}
		
		public SQLBuilder setNextValue(Object value)
		{
			SQL_STATEMENT = setNextValueInternal(SQL_STATEMENT, value);
			
			return this;
		}
		
		@Override
		public String toString()
		{
			return SQL_STATEMENT;
		}
	}
}