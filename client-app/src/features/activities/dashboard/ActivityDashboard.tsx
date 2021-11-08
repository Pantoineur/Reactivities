import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { Activity } from '../../../app/modules/Activity'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    editMode: boolean;

    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({activities, selectedActivity, selectActivity, cancelSelectActivity,
                                            editMode, openForm, closeForm, createOrEdit, deleteActivity}: Props) { // destructure activities from Props interface (avoid 'props.')
    return (
        <Grid>
            <Grid.Column width="10"> {/*10 out of 16*/}
                <List>
                    <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity}/>
                </List>
            </Grid.Column>
            <Grid.Column width="6"> {/*16 out of 16*/}
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity} 
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    />
                }
                {editMode && 
                    <ActivityForm 
                        activity={selectedActivity}
                        closeForm={closeForm}
                        createOrEdit={createOrEdit}
                    />
                }
            </Grid.Column>
        </Grid>
    )
}
