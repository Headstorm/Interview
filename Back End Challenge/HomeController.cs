using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Http;
using Microsoft.AspNetCore.JsonPatch;
using Newtonsoft.Json;

namespace Headstorm_Front_End_Challenge
{
    public class HomeController : ApiController
    {
        //Used double since it didn't specify that numbers would be integers. 
        List<double> StoredList = new List<double>();
        //Didn't want to deal with permissions so just stored it on a spared drive I have.
        string fileName = "E:\\test.txt";


        [HttpPost]
        public bool GetNumberList([FromBody] List<string> list)
        {
            //false is error.
            if (list.Count != 500)
            {
                return false;
            }

            foreach (string item in list)
            {
                double temp;
                if (Double.TryParse(item, out temp))
                {
                    StoredList.Add(temp);
                }
                else
                {
                    //false is error.
                    return false;
                }
            }

            StoredList.Sort(); //From the wording it implies the list should be sorted at this point.

            //In the real world I'd put the file IO in separate functions, but didn't want to add a bunch of files to this project.
            File.Delete(fileName);
            TextWriter tw = new StreamWriter(@fileName, true);

            tw.WriteLine(JsonConvert.SerializeObject(StoredList));

            tw.Flush();
            tw.Close();

            return true;
        }

        [HttpGet]
        public string SendNumberList()
        {
            if (File.Exists(fileName))
            {
                String JSONtxt = File.ReadAllText(fileName);
                StoredList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<double>>(JSONtxt);
            }

            return JsonConvert.SerializeObject(StoredList);
        }

        [HttpPatch]
        public bool ModifyNumberList([FromBody] JsonPatchDocument patchDoc)
        {
            if (File.Exists(fileName))
            {
                String JSONtxt = File.ReadAllText(fileName);
                StoredList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<double>>(JSONtxt);
            }
            else
            {
                return false;
            }

            try
            {
                if (patchDoc != null)
                {
                    patchDoc.ApplyTo(StoredList);
                }

                //The instructions said to put the value in the appropriate location in the list, so I figure sorting it will get everything in order again if they place it in the wrong spot.
                StoredList.Sort();
                //Instructions unclear if the list should grow or remain at 500, but if it should remain at 500 then remove the last element from the list here.

                File.Delete(fileName);
                TextWriter tw = new StreamWriter(@fileName, true);

                tw.WriteLine(JsonConvert.SerializeObject(StoredList));

                tw.Flush();
                tw.Close();
                
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
            
        }

        
    }
}