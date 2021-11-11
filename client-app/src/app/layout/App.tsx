import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../modules/Activity";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid';
import agent from "../api/agent";
import LoadingComponent from "./loadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
    const {activityStore} = useStore();

    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    function handleSelectActivity(id: string){
        if(editMode) handleFormClose();
        setSelectedActivity(activities.find(x => x.id === id));
    }

    function handleCancelSelectActivity(){
        setSelectedActivity(undefined);
        setEditMode(false);
    }

    function handleFormOpen(id? : string){
        id ? handleSelectActivity(id) : handleCancelSelectActivity();
        setEditMode(true);
    }

    function handleFormClose(){
        setEditMode(false);
    }

    function handleCreateOrEditActivity(activity: Activity) {
        setSubmitting(true);
        if(activity.id){
            agent.Activities.update(activity).then(() => {
                setActivities([...activities.filter(x => x.id !== activity.id), activity])
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            })
        }
        else {
            activity.id = uuid();
            agent.Activities.create(activity).then(() => {
                setActivities([...activities, activity])
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            })
        }
    }

    function handleDeleteActivity(id : string){
        setSubmitting(true);
        agent.Activities.delete(id).then(() => {
            setSubmitting(false);
            setActivities([...activities.filter(x => x.id !== id)])
            if(editMode) setEditMode(false);
            if(selectedActivity) setSelectedActivity(undefined);
        })
    }

    if(activityStore.loadingInitial) return <LoadingComponent content="Loading app"/>

    return (
        <>
            <Navbar openForm={handleFormOpen} />
            <Container style={{marginTop: '6em'}}>
                <ActivityDashboard 
                    activities={activityStore.activities}
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancelSelectActivity}
                    editMode={editMode}
                    openForm={handleFormOpen}
                    closeForm={handleFormClose}
                    createOrEdit={handleCreateOrEditActivity}
                    deleteActivity={handleDeleteActivity}
                    submitting={submitting}
                />
            </Container>
        </>
    );
}

export default observer(App);
