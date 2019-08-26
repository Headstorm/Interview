using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace UserDataConverter
{
    class Program
    {
        static void Main(string[] args)
        {
            // verify arguments
            if (args.Length == 0) 
            {
                PrintUsage();
                return;
            }

            var fileName = args[0];
            if (!File.Exists(fileName)) 
            {
                Console.WriteLine($"Error: input file '${fileName}' does not exist.");
                PrintUsage();
                return;
            }

            // data convert parses file input and converts input user records to output sql data
            var dataConverter = new DataConverter();

            // parse file and convert to list of import users
            var importUsers = dataConverter.ParseFile(fileName);

            // convert each import user to SQL data
            var sqlExportData = new List<SqlData>();
            importUsers.ForEach( importUser => 
            {
                sqlExportData.Add(dataConverter.ConvertToSqlData(importUser));
            });

            // loop through sql export data
            sqlExportData.ForEach( sqlData => 
            {
                // write the insert statements for each SQL table
                Console.WriteLine(sqlData.User.ToInsertString());
                Console.WriteLine(sqlData.Contact.ToInsertString());
                Console.WriteLine(sqlData.Order.ToInsertString());
            });
        }

        private static void PrintUsage()
        {
            Console.WriteLine("UserDataConverter");
            Console.WriteLine("  usage: UserDataConverter <path-to-import-data>");
        }
    }
}
