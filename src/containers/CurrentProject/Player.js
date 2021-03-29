import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrent, actions } from '../../reducers/currentSlice';
import { actions as dataActions} from '../../reducers/dataSlice';

import { Button } from 'primereact/button';

import playerEnum from '../../enums/player';


function Player () {
    const [start, setStart] = useState({ disabled: false });
    const [pause, setPause] = useState({ disabled: true, type: 'pause' });
    const [stop, setStop] = useState({ disabled: true });
    const [undo, setUndo] = useState({ disabled: true });
    const [redo, setRedo] = useState({ disabled: true });
    const current = useSelector(selectCurrent);

    const dispatch = useDispatch();

    const startClicked = () => {
        dispatch(actions.addTimelineEvent(playerEnum['START']));
    }

    const pauseClicked = () => {
        if (pause.type === 'pause') {
            dispatch(actions.addTimelineEvent(playerEnum['PAUSE']));
        } else {
            dispatch(actions.addTimelineEvent(playerEnum['RESUME']));
        }
    }

    const stopClicked = () => {
        dispatch(actions.addTimelineEvent(playerEnum['STOP']));
       
    }

    const undoClicked = () => {
        dispatch(actions.undoEvent());
    }

    const redoClicked = () => {
        dispatch(actions.redoEvent());
    }

    useEffect(() => {
        const isStart = current.timeline.find(({ event }) =>  event === playerEnum['START']);

        if (isStart) {
            setStart({ disabled: true });
            setStop({ disabled: false });
            const last = current.timeline[current.timeline.length - 1];
            const isLastPause = last.event === playerEnum['PAUSE'];
            const isLastStop = last.event === playerEnum['STOP'];

            if (isLastPause) {
                setPause({ disabled: false, type: 'resume' })
            } else {
                setPause({ disabled: false, type: 'pause' })
            }

            if (isLastStop) {
                dispatch(dataActions.saveCurrentSet(current));
                dispatch(actions.reset());
            }
        } else {
            setStart({ disabled: false });
            setPause({ disabled: true, type: 'pause' });
            setStop({ disabled: true });
        }

        if (current.timeline.length === 0) {
            setUndo({ disabled: true })
        } else {
            setUndo({ disabled: false })
        }

        if (current.redoList.length === 0) {
            setRedo({ disabled: true })
        } else {
            setRedo({ disabled: false })
        }
    }, [current, dispatch])


    
    return (
        <div style={{background: '#dadada', width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Button style={{ marginLeft: '50px'}} className="p-button-secondary" disabled={start.disabled} onClick={startClicked}>START</Button>
            {<Button style={{ margin: '0 3px'}} className="p-button-secondary" disabled={pause.disabled} onClick={pauseClicked}>{pause.type === 'pause' ? 'PAUSE' : 'RESUME'}</Button>}
            <Button style={{ marginRight: '50px'}} className="p-button-secondary" disabled={stop.disabled} onClick={stopClicked}>STOP</Button>

            <Button style={{ margin: '0px 3px 0px 50px'}} icon="pi pi-arrow-circle-left" className="p-button-secondary" disabled={undo.disabled} onClick={undoClicked}></Button>
            <Button icon="pi pi-arrow-circle-right" className="p-button-secondary" disabled={redo.disabled} onClick={redoClicked}></Button>
        </div>
    );
}

export default Player;