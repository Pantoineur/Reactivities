import { observer } from 'mobx-react-lite'
import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'


export default observer(function ActivityDashboard() { // destructure activities from Props interface (avoid 'props.')
    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;

    return (
        <Grid>
            <Grid.Column width="10"> {/*10 out of 16*/}
                <List>
                    <ActivityList />
                </List>
            </Grid.Column>
            <Grid.Column width="6"> {/*16 out of 16*/}
                {selectedActivity && !editMode &&
                    <ActivityDetails />
                }
                {editMode && 
                    <ActivityForm />
                }
            </Grid.Column>
        </Grid>
    )
})