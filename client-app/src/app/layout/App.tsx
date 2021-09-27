import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container, Header, List } from "semantic-ui-react";
import { Activity } from "../modules/Activity";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

    useEffect(() => {
        axios.get<Activity[]>("http://localhost:5000/api/activities").then((response) => {
            setActivities(response.data);
        });
    }, []);

    function handleSelectActivity(id: string){
        setSelectedActivity(activities.find(x => x.id === id));
    }

    function handleCancelSelectActivity(){
        setSelectedActivity(undefined);
    }

    return (
        <>
            <Navbar />
            <Container style={{marginTop: '6em'}}> 
                <ActivityDashboard 
                    activities={activities}
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancelSelectActivity}
                />
            </Container>
        </>
    );
}

export default App;