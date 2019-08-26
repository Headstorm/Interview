using UserDataConverter.Sql;

namespace UserDataConverter
{
    public class SqlData
    {
        public SqlData()
        {
            User =  new UserRecord();
            Order = new OrderRecord();
            Contact = new ContactRecord();
        }
        public UserRecord User { get; set; }
        public OrderRecord Order { get; set; }
        public ContactRecord Contact { get; set; }
    }
}