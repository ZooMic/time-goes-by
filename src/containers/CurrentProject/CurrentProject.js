import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProjects } from '../../reducers/metaSlice';
import { actions, selectProjectId } from '../../reducers/currentSlice';

import { SelectButton } from 'primereact/selectbutton';
import Player from './Player';
import Timeline from './Timeline';
import Clock from './Clock';

function CurrentProject () {
    const dispatcher = useDispatch();
    const projects = useSelector(selectProjects);
    const currentProject = useSelector(selectProjectId);
    
    const createOptions = () => {
        const keys = Object.keys(projects);
        let options = [];
        keys.forEach(key => {
            options.push({ name: projects[key].name, value: key });
        });
        return options;
    }

    const onProjectChange = (event) => {
        dispatcher(actions.setProject(event.value));
    };

    return (
        <Fragment>
            <div style={{width: '100%', padding: '10px', border: '1px solid #dadada'}}>
                <h2 style={{ marginBottom: '10px' }}>Projects</h2>
                <SelectButton value={currentProject} options={createOptions()} onChange={onProjectChange} optionLabel="name" />
            </div>
            <Player />
            <Timeline />
            <Clock />
        </Fragment>
    );
}

export default CurrentProject;