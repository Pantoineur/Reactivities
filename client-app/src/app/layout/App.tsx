import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./loadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
    const {activityStore} = useStore();

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    if(activityStore.loadingInitial) return <LoadingComponent content="Loading app"/>

    return (
        <>
            <Navbar />
            <Container style={{marginTop: '6em'}}>
                <ActivityDashboard />
            </Container>
        </>
    );
}

export default observer(App);
