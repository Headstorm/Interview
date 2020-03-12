package Javier.DatabaseMigrationTool;

public class NoSQLInfoObject {
	private int record_id;
    private String name;
    private String cell_phone;
    private String work_phone;
    private String email;
    private String address;
    private int b_widget_order;
    private int a_widget_order;
    private boolean protection_plan;

    private String address_street = null;
    private String address_city = null;
    private String address_state = null;
    private String address_zip = null;
	
	public NoSQLInfoObject() {
		
	}
	
	public NoSQLInfoObject(int record_id, String name, String cell_phone, String work_phone, 
			String email, String address, int b_widget_order, int a_widget_order, boolean protection_plan,
			String address_street, String address_city, String address_state, String address_zip) {
		this.record_id = record_id;
		this.name = name;
		this.cell_phone = cell_phone;
		this.work_phone = work_phone;
		this.email = email;
		this.address = address;
		this.b_widget_order = b_widget_order;
		this.a_widget_order = a_widget_order;
		this.protection_plan = protection_plan;
		this.address_street = address_street;
		this.address_city = address_city;
		this.address_state = address_state;
		this.address_zip = address_zip;
	}

	public int getRecord_id() {
		return record_id;
	}

	public String getName() {
		return name;
	}

	public String getCell_phone() {
		return cell_phone;
	}

	public String getWork_phone() {
		return work_phone;
	}

	public String getEmail() {
		return email;
	}

	public String getAddress() {
		return address;
	}

	public int getB_widget_order() {
		return b_widget_order;
	}

	public int getA_widget_order() {
		return a_widget_order;
	}

	public boolean isProtection_plan() {
		return protection_plan;
	}

	public String getAddress_street() {
		return address_street;
	}

	public String getAddress_city() {
		return address_city;
	}

	public String getAddress_state() {
		return address_state;
	}

	public String getAddress_zip() {
		return address_zip;
	}
	
	public void printSQLObjectInfo() {
		System.out.println("######################################################");
        System.out.println("Record ID: " + record_id);
        System.out.println("Name: " + name);
        System.out.println("Cellphone: " + cell_phone);
        System.out.println("Workphone: " + work_phone);
        System.out.println("Email: " + email);
        System.out.println("Address: " + address);
        System.out.println("Basic Order: " + b_widget_order);
        System.out.println("Advanced Order: " + a_widget_order);
        System.out.println("Protection Plan: " + protection_plan);
        System.out.println("\nAddress Street: " + address_street);
        System.out.println("Address City:" + address_city);
        System.out.println("Address State: " + address_state);
        System.out.println("Address Zip: " + address_zip);
	}

}
