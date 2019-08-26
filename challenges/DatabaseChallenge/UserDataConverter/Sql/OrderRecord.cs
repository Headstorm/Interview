namespace UserDataConverter.Sql
{
    public class OrderRecord
    {
        public OrderRecord()
        {
            Id = 0;
            UserId = 0;
            BasicWidgetOrder = 0;
            AdvancedWidgetOrder = 0;
            ProtectionPlan = false;
        }

        // this ID is the PK and will be automatically generated int the database
        public int Id { get; set; }
        public int UserId { get; set; } 
        public int BasicWidgetOrder { get; set; }
        public int AdvancedWidgetOrder { get; set; }
        public bool ProtectionPlan { get; set; }

        public string ToInsertString() 
        {
            return $"INSERT INTO Order (UserId, BasicWidgetOrder, AdvanceWidgetOrder, ProtectionPlan) VALUES ({UserId}, {BasicWidgetOrder}, {AdvancedWidgetOrder}, {ProtectionPlan.ToString().ToUpper()});";
        }

    }
}