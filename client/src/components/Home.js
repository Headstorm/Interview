import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import ContactPage from './ContactPage';
import DataUpload from './DataUpload';
import { DBUpload } from './DBUpload';
import '../App.css';

// displays the homepage
const Home = () => {
    // declare hook
    const [showDataUpload, setShowDataUpload] = useState(false);

    return (
        <>
            <div className="App">
                <h1 > Company Name
        </h1>
                <Card>
                    <Card.Body>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum quisquam eum porro a pariatur accusamus veniam.
            </Card.Body>
                </Card>

                <ContactPage></ContactPage>
                <br />
                <Button variant="secondary" onClick={DBUpload}>Convert NoSQL to SQL</Button>
                <br /><br />
                <Button variant="secondary" onClick={() => setShowDataUpload(!showDataUpload)}>Upload JSON file</Button>
                {
                    showDataUpload == true ?
                        <DataUpload />
                        :
                        <></>
                }
            </div>
        </>
    )
}

export default Home;