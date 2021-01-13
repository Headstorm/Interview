import React from 'react';
import {
    postData,
    getData
} from '../api/index.js';

class DataUpload extends React.Component {

    // declare variables
    state = {
        data: null,
        sorted: false
    };

    // store the data from the file
    onFileUpload = (e) => {
        let fileName = e.target.files[0].name;

        // checks to see if the file is indeed a JSON file
        if (fileName.substring(fileName.indexOf(".") + 1) == "json") {
            e.preventDefault();
            const reader = new FileReader();

            // read through file
            reader.onload = (e) => {
                const text = e.target.result;

                // set data variable to the file data
                this.setState({ data: JSON.parse(text) });

                // call POST api
                this.validatePost();
            }
            reader.readAsText(e.target.files[0]);
        }
        else {
            alert("Please submit a .json file.")
        }
    }

    // calls the /data POST method
    // if the response is true, the /data GET method will be called 
    async validatePost() {
        let res;
        res = await postData(this.state.data);

        if (res == true) {
            //call the GET
            this.validateGet();
        }

        else {
            alert("The submitted file does not contain exactly 500 numbers\nOR\nYou must submit a file containing only numbers")
        }
    }

    // calls the /data GET method
    // sets the data variable to the returned sorted JSON data
    async validateGet() {
        let finalResult = await getData();
        this.setState({ data: finalResult })
        // console.log("Sorted JSON file: ");
        // console.log(finalResult);
    }

    // displays the sorted array on the button click
    showJSON = () => {
        // console.log("shjowJSON button clicked " + this.state.data)
        this.setState({ sorted: !this.state.sorted })
        // console.log(this.state.data);
        // return (
        //     <div>
        //         {this.state.data}
        //     </div>
        // );
    }

    // recieves the file and gives error messages where necessary
    // clicking the "Show JSON list" button will print the final sorted JSON data
    render() {
        return (
            <div>
                <div>
                    <input type="file" onChange={(e) => this.onFileUpload(e)} />
                </div>
                <button onClick={this.showJSON}>Show JSON list</button>
                <br />
                {this.state.sorted === true &&
                    <>[
                        {this.state.data.map((number, index) => {
                            return (
                                <span key={index}>
                                    {number}
                                    {index != this.state.data.length - 1 && <>,</>}
                                    {index % 10 == 0 && index != 0 && <br />}
                                </span>
                            )
                        })}
                ]</>}
            </div>
        );
    }
}
// dataUpload = async () => {
//     await d.postData(this.data);
// }


export default DataUpload;