import { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProjects, actions } from '../../reducers/metaSlice';
import { actions as dataActions } from '../../reducers/dataSlice';

import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

const TOOLBAR_DIALOGS = [
    'add-project',
];

function AppToolbar () {
    const [visibleDialog, setVisibleDialog] = useState(null);
    const [projectName, setProjectName] = useState('');
    const [projectNameInvalid, setProjectNameInvalid] = useState(false);
    const projects = useSelector(selectProjects);
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        const projectsKeys = Object.keys(projects);
        let exist = false;
        projectsKeys.forEach(key => {
            if (projects[key].name === projectName) {
                exist = true;
            }
        });

        if (exist) {
            setProjectNameInvalid(true);
        } else {
            setProjectNameInvalid(false);
        }
    }, [projectName, projects]);


    const addProjectClicked = () => {
        setVisibleDialog('add-project');
    };

    const closeDialogClicked = () => {
        setVisibleDialog(null);
    }

    const saveProject = () => {
        if (projectNameInvalid) {
            return;
        }
        dispatch(actions.addProject(projectName));
    }

    const footer = () => (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={closeDialogClicked} className="p-button-text" />
            <Button label="Add" icon="pi pi-check" onClick={saveProject} autoFocus />
        </div>
    );

    const leftContents = (
        <Fragment>
            <Button label="Dodaj projekt" icon="pi pi-plus" className="p-button-success" onClick={addProjectClicked} />
            <Dialog header="Add project" visible={visibleDialog === TOOLBAR_DIALOGS[0]} footer={footer} style={{width: '500px'}} onHide={closeDialogClicked} baseZIndex={1000}>
                <div className="card" style={{ padding: '1.5em 0em 1em 0' }}>
                    <span className="p-float-label">
                        <InputText
                            id="project-name"
                            value={[projectName]}
                            onChange={(e) => setProjectName(e.target.value)}
                            aria-describedby="project-name-error"
                            className={ projectNameInvalid ? "p-invalid p-d-block" : '' }
                        />
                        <label htmlFor="project-name">Project name</label>
                        {projectNameInvalid ? <small style={{marginLeft: '10px'}} id="project-name-error" className="p-error p-d-block">Project already exist.</small> : null}
                    </span>
                </div>
            </Dialog>
        </Fragment>
    );

    const saveClicked = () => {
        localStorage.setItem('state', JSON.stringify(state));
    }

    const openClicked = () => {
        const openedState = JSON.parse(localStorage.getItem('state') || '{}');
        const { meta: newMeta, data: newData } = openedState;
        dispatch(actions.addAllMeta(newMeta));
        dispatch(dataActions.addAllData(newData));
    }

    const rightContents = (
        <Fragment>
            <Button onClick={saveClicked} style={{marginRight: '10px'}} icon="pi pi-check" className="p-button-success" label="Zapisz" />
            <Button onClick={openClicked} icon="pi pi-folder-open" className="p-button-success" label="Otwórz" />
        </Fragment>
    );

    return (
        <Toolbar left={leftContents} right={rightContents} />
    );
}

export default AppToolbar;