package com.headstorm.interview.database;

import com.google.gson.annotations.SerializedName;

public class PortableData
{
	private static final String SQL_INSERT_STATEMENT = "INSERT INTO orders (record_id, name, cell_phone, work_phone, email, address, basic_widget_order, advanced_widget_order, protection_plan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
	
	@SerializedName("Record ID")
	private final int _recordId;
	
	@SerializedName("Name")
	private final String _name;
	
	@SerializedName("Cell Phone")
	private final String _cellPhone;
	
	@SerializedName("Work Phone")
	private final String _workPhone;
	
	@SerializedName("Email")
	private final String _email;
	
	@SerializedName("Address")
	private final String _address;
	
	@SerializedName("Basic Widget Order")
	private final int _basicOrder;
	
	@SerializedName("Advanced Widget Order")
	private final int _advancedOrder;
	
	@SerializedName("Protection Plan")
	private final boolean _protectionPlan;
	
	private PortableData()
	{
		_recordId = -1;
		_name = null;
		_cellPhone = null;
		_workPhone = null;
		_email = null;
		_address = null;
		_basicOrder = -1;
		_advancedOrder = -1;
		_protectionPlan = false;
	}
	
	public String getInsertionStatement()
	{
		return SQLFormatUtil.setNextValue(SQL_INSERT_STATEMENT, _recordId)
				.setNextValue(_name)
				.setNextValue(_cellPhone)
				.setNextValue(_workPhone)
				.setNextValue(_email)
				.setNextValue(_address)
				.setNextValue(_basicOrder)
				.setNextValue(_advancedOrder)
				.setNextValue(_protectionPlan)
				.toString()
				;
	}
}