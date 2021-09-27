import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { Activity } from '../../../app/modules/Activity'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
}

export default function ActivityDashboard({activities, selectedActivity, selectActivity, cancelSelectActivity}: Props) { // destructure activities from Props interface (avoid 'props.')
    return (
        <Grid>
            <Grid.Column width="10"> {/*10 out of 16*/}
                <List>
                    <ActivityList activities={activities} selectActivity={selectActivity}/>
                </List>
            </Grid.Column>
            <Grid.Column width="6"> {/*16 out of 16*/}
                {selectedActivity &&
                    <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity}/>
                }
                <ActivityForm/>
            </Grid.Column>
        </Grid>
    )
}
