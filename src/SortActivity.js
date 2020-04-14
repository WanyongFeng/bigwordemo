import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AppHeader from "./components/AppHeader.js";
import RightSide from "./components/RightSide.js"
import { findByLabelText } from '@testing-library/dom';

export function SortActivity(props) {
    let [items, setItems] = useState([]);
    let [selected, setSelected] = useState([]);

    let [examples, setExamples] = useState(null);
    let [instructions, setInstructions] = useState(null);
    let [score, setScore] = useState(0); // totoal score
    let [correctWords, setCorrectWords] = useState([]); // correct words

    useEffect(() => {
        // fetch some data from the database
        if (items.length === 0) {
            setItems(getItems(10));
        }
    }, [items]);

    useEffect(() => {
        // fetch some data from the database
        if (selected.length === 0) {
            setSelected(getItems(5,10));
        }
    }, [selected]);

    const getList = (id) => {
        if (id==='droppable') {
            return items;
        } else if (id==='droppable2') {
            return selected;
        }
    };

    // fake data generator
    const getItems = (count, offset = 0) =>
        Array.from({ length: count }, (v, k) => k).map(k => ({
            id: `item-${k + offset}`,
            content: `item ${k + offset}`
        }));

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    /**
     * Moves an item from one list to another list.
     */
    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    const grid = 8;

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'blue' : 'lightblue',
        padding: grid,
        width: 250
    });

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    const onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            if(source.droppableId === 'droppable') {
                setItems(items);
            }else if(source.droppableId === 'droppable2') {
                setSelected(items);
            }
        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );

            setItems(result.droppable);
            setSelected(result.droppable2);
        }
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    return (
        <div className="Main-content-format">
            <div style={{display: "flex", justifyContent: "space-around"}}>
                <AppHeader renderGame={props.renderGame} />
                {/* <InfoBar examples={examples} instructions={instructions} /> */}
                <DragDropContext onDragEnd={onDragEnd} style={{height: "80%"}}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {items.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="droppable2">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {selected.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <RightSide score={score} correctWords={correctWords} className="RightSide" />
        </div>
    );
}
