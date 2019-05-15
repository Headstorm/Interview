using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;

namespace DataMigration
{
    class Program
    {
        static void Main(string[] args)
        {
            using (StreamReader r = new StreamReader("OrderData.json"))
            {
                string json = r.ReadToEnd();
                GenericOrderData[] items = JsonConvert.DeserializeObject<GenericOrderData[]>(json);
                foreach (GenericOrderData obj in items)
                {
                    Customer customer = new Customer(obj.CustomerId, obj.Name, obj.Email, obj.Cell, obj.Work, obj.Address);
                    Order order = new Order(obj.OrderId, obj.CustomerId, obj.BasicWidgetNum, obj.AdvancedWidgetNum, obj.IsProtectionPlan);

                }
            }
        }
    }

    class Order
    {
        private int OrderId;
        private int CustomerId;
        private int BasicWidgetNum;
        private int AdvancedWidgetNum;
        private bool IsProtectionPlan;
        public Order(int orderId, int customerId, int basicWidgetNum, int advancedWidgetNum, bool isProtectionPlan)
        {
            this.AdvancedWidgetNum = advancedWidgetNum;
            this.BasicWidgetNum = basicWidgetNum;
            this.CustomerId = customerId;
            this.OrderId = orderId;
            this.IsProtectionPlan = isProtectionPlan;

        }

    }

    class Customer
    {
        private int CustomerId;
        private string Name;
        private string Email;
        private string Cell;
        private string Work;
        private string Address;
        public Customer(int customerId, string name, string email, string cell, string work, string address)
        {
            this.CustomerId = customerId;
            this.Address = address;
            this.Cell = cell;
            this.Email = email;
            this.Work = work;
            this.Name = name;
        }
    }

    public class GenericOrderData
    {
        private int customerId;

        public int CustomerId
        {
            get
            {
                return CustomerId;
            }
        }

        private string name;

        public string Name
        {
            get
            {
                return Name;
            }
        }

        private string email;

        public string Email
        {
            get
            {
                return Email;
            }
        }

        private string cell;

        public string Cell
        {
            get
            {
                return Cell;
            }
        }

        private string work;

        public string Work
        {
            get
            {
                return Work;
            }
        }

        private string address;

        public string Address
        {
            get
            {
                return Address;
            }
        }

        private int orderId;

        public int OrderId
        {
            get
            {
                return OrderId;
            }
        }

        private int basicWidgetNum;

        public int BasicWidgetNum
        {
            get
            {
                return BasicWidgetNum;
            }
        }

        private int advancedWidgetNum;

        public int AdvancedWidgetNum
        {
            get
            {
                return AdvancedWidgetNum;
            }
        }

        private bool isProtectionPlan;

        public bool IsProtectionPlan
        {
            get
            {
                return IsProtectionPlan;
            }
        }

    }
}
