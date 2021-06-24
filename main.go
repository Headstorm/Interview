package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"sort"
	"strings"

	"github.com/gofiber/fiber/v2"
)

//DATABASE CHALLENGE STRUCTS

type Customers struct {
	Customers []Customer `json:"customers"`
}

type Customer struct {
	RecordID            int    `json:"RecordID"`
	Name                string `json:"Name"`
	Cell                string `json:"CellPhone"`
	Work                string `json:"WorkPhone"`
	Email               string `json:"Email"`
	Address             string `json:"Address"`
	BasicWidgetOrder    int    `json:"BasicWidgetOrder"`
	AdvancedWidgetOrder int    `json:"AdvancedWidgetOrder"`
	ProtectionPlan      string `json:"ProtectionPlan"`
}

//BACKEND CHALLENGE STRUCTS

type ErrorResponse struct {
	Status     string `json:"status"`
	StatusCode string `json:"status_code"`
	Message    string `json:"message"`
}

type SuccessResponse struct {
	Status     string `json:"status"`
	StatusCode string `json:"status_code"`
	Data       []int  `json:"data"`
}

type NumberList struct {
	Numbers []int `json:"numbers"`
}

var n NumberList

func main() {
	app := fiber.New()

	//Create struct from list of numbers sent through POST
	app.Post("/data", func(c *fiber.Ctx) error {
		c.Accepts("application/json")

		//error if not sending a list of ints
		if err := c.BodyParser(&n); err != nil {
			e := ErrorResponse{
				Status:     "ERROR",
				StatusCode: "INCORRECT-TYPE",
				Message:    "Numbers can only accept a list of integers",
			}
			fmt.Println(err)
			return c.JSON(e)
		}
		//error if list is less thatn 500
		if len(n.Numbers) < 500 {
			e := ErrorResponse{
				Status:     "ERROR",
				StatusCode: "INCORRECT-SIZE",
				Message:    "The list of numbers sent is under the required amount of 500.",
			}
			return c.JSON(e)
		}
		//error if list is greater than 500
		if len(n.Numbers) > 500 {
			e := ErrorResponse{
				Status:     "ERROR",
				StatusCode: "INCORRECT-SIZE",
				Message:    "The list of numbers sent is over the required amount of 500.",
			}
			return c.JSON(e)
		}

		success := SuccessResponse{
			Status:     "success",
			StatusCode: "RECIEVED",
			Data:       n.Numbers,
		}
		return c.JSON(success)
	})

	//GET list of numbers from previous post request
	app.Get("/data", func(c *fiber.Ctx) error {
		//error if array of 500 ints does not exist or is not the correct size
		if len(n.Numbers) != 500 {
			e := ErrorResponse{
				Status:     "ERROR",
				StatusCode: "INCORRECT-SIZE",
				Message:    "The list of numbers does not meet the required size amount of 500. Please send a new list.",
			}
			return c.JSON(e)
		}
		//sort array from previous request
		sort.Slice(n.Numbers, func(i, j int) bool {
			return n.Numbers[i] < n.Numbers[j]
		})

		success := SuccessResponse{
			Status:     "success",
			StatusCode: "SORTED",
			Data:       n.Numbers,
		}
		return c.JSON(success) // => ✋ register
	})

	app.Get("/migrate", func(c *fiber.Ctx) error {
		//Migrate data
		fmt.Println("Migrating Customers")
		dbMigrate()
		return c.JSON("Migrating Customers...")
	})

	//serve all static public files
	app.Static("/", "./public")
	//listen on port 3000
	app.Listen(":3000")

}

func dbMigrate() {
	var customers Customers
	//open json file
	jsonFile, err := os.Open("customers.json")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Successfully Opened customers.json")
	//defer close to parse later
	defer jsonFile.Close()

	byteVal, _ := ioutil.ReadAll(jsonFile)
	json.Unmarshal(byteVal, &customers)

	for _, c := range customers.Customers {
		fmt.Printf("*** MIGRATION FOR CUSTOMER# %v ***\n", c.RecordID)
		//insertion for customer table//
		fmt.Printf("INSERT INTO customers (record_id, name, cell_phone, work_phone, email, address) VALUES (%v, %v, %v, %v, %v, %v)\n", c.RecordID, c.Name, c.Cell, c.Work, c.Email, c.Address)
		//insertion for options table//
		fmt.Printf("INSERT INTO options (record_id, basic_widget_order, advanced_widget_order) VALUES (%v, %v, %v)\n", c.RecordID, c.BasicWidgetOrder, c.AdvancedWidgetOrder)
		//convert boolean protection plan value to int
		prot_plan := 0
		if strings.ToLower(c.ProtectionPlan) == "true" {
			prot_plan = 1
		}
		//insertion for plans table//
		fmt.Printf("INSERT INTO plans (record_id, protection_plan) VALUES (%v, %v)\n", c.RecordID, prot_plan)
		fmt.Printf("\n")
	}
}
