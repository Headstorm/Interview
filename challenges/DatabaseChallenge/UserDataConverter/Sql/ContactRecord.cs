namespace UserDataConverter.Sql
{
    public class ContactRecord
    {
        public ContactRecord()
        {
            Id = 0;
            UserId = 0;
            CellPhone = string.Empty;
            WorkPhone = string.Empty;
            Address = string.Empty;
        }

        // this ID is the PK and will be automatically generated int the database
        public int Id { get; set; }
        public int UserId { get; set; } 
        public string CellPhone { get; set; }
        public string WorkPhone { get; set; }
        public string Address { get; set; }
        public string ToInsertString() 
        {
            return $"INSERT INTO Contact (UserId, CellPhone, WorkPhone, Address) VALUES ({UserId}, '{CellPhone}', '{WorkPhone}', '${Address}');";
        }

    }
}