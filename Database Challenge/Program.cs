using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Headstorm_Database_Challenge
{

    public class Record
    {
        public int RecordID { get; set; }
        public string Name { get; set; }
        public string CellPhone { get; set; }
        public string WorkPhone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public int? BasicWidgetOrder { get; set; }
        public int? AdvancedWidgetOrder { get; set; }
        public bool ProtectionPlan { get; set; }
    }


    class Program
    {
        public static string SQLQueryMaker()
        {
            StringBuilder result = new StringBuilder();
            List<Record> records = new List<Record>();
            string fileName = System.Environment.CurrentDirectory + "\\DatabaseRecords.json";

            if (File.Exists(fileName))
            {
                String JSONtxt = File.ReadAllText(fileName);
                records = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Record>>(JSONtxt);
            }

            result.AppendLine("DECLARE @CustomerID AS INT");
            result.AppendLine("");

            foreach (Record record in records)
            {
                //Insert the customer into the Customers table if it's a new customer, otherwise get the existing customer ID to link the order.
                //Usually would use parameters instead of adding strings, but that doesn't work when printing a query to a file.
                //I haven't tested the SQL statements themselves, but they should either work or be close to working.
                result.AppendLine("IF " + record.Email + " IN (SELECT Email FROM Customers)");
                result.AppendLine("BEGIN");
                result.AppendLine("SELECT @CustomerID = CustomerID FROM Customers WHERE Email = " + record.Email);
                result.AppendLine("END");
                result.AppendLine("ELSE");
                result.AppendLine("BEGIN");
                result.AppendLine("INSERT INTO Orders (Name, CellPhone, WorkPhone, Email, Address)");
                result.AppendLine("OUTPUT Inserted.ID INTO @CustomerID");
                result.AppendLine("VALUES( " + record.Name + ", " + record.CellPhone + ", " + record.WorkPhone + ", " + record.Email + ", " + record.Address + " )");
                result.AppendLine("END");
                result.AppendLine("");
                result.AppendLine("INSERT INTO Orders (CustomerID, RecordID, WidgetOrder, Advanced, ProtectionPlan) VALUES (@CustomerID, " + record.RecordID + ", " + (record.BasicWidgetOrder == null ? record.AdvancedWidgetOrder : record.BasicWidgetOrder) + ", " + (record.BasicWidgetOrder == null ? 1 : 0) + ", " + (record.ProtectionPlan ? 1 : 0 ) + " )");
                result.AppendLine("");
            }

            return result.ToString();
        }

        static void Main(string[] args)
        {
            string fileName = System.Environment.CurrentDirectory + "\\test.txt";
            File.Delete(fileName);
            TextWriter tw = new StreamWriter(@fileName, true);

            tw.Write(SQLQueryMaker());

            tw.Flush();
            tw.Close();
        }
    }
}
