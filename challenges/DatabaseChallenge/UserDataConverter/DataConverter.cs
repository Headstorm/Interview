using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;

namespace UserDataConverter
{
    public class DataConverter
    {
        // parse file into import user records
        public List<ImportUser> ParseFile(string fileName) 
        {
            var serializer = new JsonSerializer();

            var importUsers = new List<ImportUser>();   
            using (StreamReader file = File.OpenText(fileName))
            {   
                importUsers.AddRange((ImportUser[]) serializer.Deserialize(file, typeof(ImportUser[])));
            }
            return importUsers;
        }

        // convert import user to sql data
        internal SqlData ConvertToSqlData(ImportUser importUser)
        {
            var sqlData = new SqlData();
            
            sqlData.User.Id = importUser.RecordId;
            sqlData.User.Name = importUser.Name;
            sqlData.User.Email = importUser.Email;

            sqlData.Contact.UserId = importUser.RecordId;
            sqlData.Contact.CellPhone = importUser.CellPhone;
            sqlData.Contact.WorkPhone = importUser.WorkPhone;
            sqlData.Contact.Address = importUser.Address;

            sqlData.Order.UserId = importUser.RecordId;
            sqlData.Order.BasicWidgetOrder = importUser.BasicWidgetOrder;
            sqlData.Order.AdvancedWidgetOrder = importUser.AdvancedWidgetOrder;
            sqlData.Order.ProtectionPlan = importUser.ProtectionPlan;

            return sqlData;
        }
    }
}