namespace UserDataConverter.Sql
{
    public class UserRecord
    {
        public UserRecord()
        {
            Id = 0;
            Name = string.Empty;
            Email = string.Empty;
        }
        public int Id { get; set; }
        public string Name { get; set; }   
        public string Email { get; set; } 

        public string ToInsertString() 
        {
            return $"INSERT INTO User (Id, Name, Email) VALUES ({Id}, '{Name}', '{Email}');";
        }
    }
}