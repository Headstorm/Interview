using Newtonsoft.Json;

namespace UserDataConverter
{
    public class ImportUser
    {
        [JsonProperty(PropertyName="Record ID")]
        public int RecordId { get; set; }

        [JsonProperty(PropertyName="Name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName="Cell Phone")]
        public string CellPhone { get; set; }

        [JsonProperty(PropertyName="Work Phone")]
        public string WorkPhone { get; set; }
        [JsonProperty(PropertyName="Email")]
        public string Email { get; set; }
        [JsonProperty(PropertyName="Address")]
        public string Address { get; set; }
        [JsonProperty(PropertyName="Basic Widget Order")]
        public int BasicWidgetOrder { get; set; }
        [JsonProperty(PropertyName="Advanced Widget Order")]
        public int AdvancedWidgetOrder { get; set; }
        
        [JsonProperty(PropertyName="Protection Plan")]
        public bool ProtectionPlan { get; set; }
        
        public override string ToString()
        {
            return $"RecordID={RecordId}  Name={Name}  CellPhone={CellPhone}  WorkPhone={WorkPhone}  Email={Email}  Address={Address}  BasicWidgetOrder={BasicWidgetOrder}  AdvancedWidgetOrder={AdvancedWidgetOrder}  ProtectionPlan={ProtectionPlan}";
        }
    }
}